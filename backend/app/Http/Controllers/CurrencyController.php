<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Currency;


class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Currency::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Currency::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Currency::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $currency = Currency::findOrFail($id);
        $currency->update($request->validated());
        return $currency;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $currency = Currency::findOrFail($id);
        $currency->delete();
        return response()->json(['message' => 'Currency deleted.']);
    }
}
