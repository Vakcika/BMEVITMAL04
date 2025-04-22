<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BillingCycle;


class BillingCycleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BillingCycle::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return BillingCycle::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return BillingCycle::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $billingCycle = BillingCycle::findOrFail($id);
        $billingCycle->update($request->validated());
        return $billingCycle;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $billingCycle = BillingCycle::findOrFail($id);
        $billingCycle->delete();
        return response()->json(['message' => 'Billing cycle deleted.']);
    }
}
