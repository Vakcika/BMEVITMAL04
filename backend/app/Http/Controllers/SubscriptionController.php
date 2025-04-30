<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriptionRequest;
use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Http\Resources\SubscriptionResource;


class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'customer' => 'nullable|string|exists:customers,id',
            'billing_cycle' => 'nullable|string|exists:billing_cycles,name',
            'sort_by' => 'nullable|in:amount,amount_in_base,transaction_date,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Subscription::query();

        if (!empty($validated['customer'])) {
            $query->whereHas('customer', function ($q) use ($validated) {
                $q->where('id', $validated['customer']);
            });
        }

        if (!empty($validated['billing_cycle'])) {
            $query->whereHas('billingCycle', function ($q) use ($validated) {
                $q->where('name', $validated['billing_cycle']);
            });
        }
        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $transactions = $query->paginate($perPage, ['*'], 'page', $page);

        return SubscriptionResource::collection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubscriptionRequest $request)
    {
        return Subscription::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new SubscriptionResource(Subscription::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubscriptionRequest $request, string $id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->update($request->validated());
        return $subscription;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->delete();
        return response()->json(['message' => 'Subscription deleted.']);
    }
}
