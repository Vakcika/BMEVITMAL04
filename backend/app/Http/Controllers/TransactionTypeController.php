<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransactionType;

class TransactionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TransactionType::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return TransactionType::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return TransactionType::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $type = TransactionType::findOrFail($id);
        $type->update($request->validated());
        return $type;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $type = TransactionType::findOrFail($id);
        $type->delete();
        return response()->json(['message' => 'Transaction type deleted.']);
    }
}
