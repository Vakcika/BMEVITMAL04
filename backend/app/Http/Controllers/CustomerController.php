<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the customers with pagination.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'user' => 'nullable|string|exists:users,name',
            'status' => 'nullable|string|exists:customer_statuses,name',
            'sort_by' => 'nullable|in:amount,amount_in_base,transaction_date,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Customer::query();

        if (!empty($validated['status'])) {
            $query->whereHas('status', function ($q) use ($validated) {
                $q->where('name', $validated['status']);
            });
        }

        if (!empty($validated['user'])) {
            $query->whereHas('user', function ($q) use ($validated) {
                $q->where('name', $validated['user']);
            });
        }
        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $transactions = $query->paginate($perPage, ['*'], 'page', $page);

        return CustomerResource::collection($transactions);
    }


    /**
     * Store a newly created customer in storage.
     */
    public function store(CustomerRequest $request)
    {
        $validated = $request->validated();
        return Customer::create($validated);
    }

    /**
     * Display the specified customer.
     */
    public function show(string $id)
    {
        return new CustomerResource(Customer::findOrFail($id));
    }

    /**
     * Update the specified customer in storage.
     */
    public function update(CustomerRequest $request, string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->validated());
        return $customer;
    }

    /**
     * Remove the specified customer from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully.']);
    }
}
