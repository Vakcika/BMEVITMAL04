<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomerStatus;

class CustomerStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CustomerStatus::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return CustomerStatus::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return CustomerStatus::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $status = CustomerStatus::findOrFail($id);
        $status->update($request->validated());
        return $status;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $status = CustomerStatus::findOrFail($id);
        $status->delete();
        return response()->json(['message' => 'Customer status deleted.']);
    }
}
