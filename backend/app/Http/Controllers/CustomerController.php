<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the customers with pagination.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        return Customer::paginate($perPage, ['*'], 'page', $page);
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
        return Customer::findOrFail($id);
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
