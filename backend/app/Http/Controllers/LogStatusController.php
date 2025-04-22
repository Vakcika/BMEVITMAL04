<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogStatus;

class LogStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LogStatus::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return LogStatus::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return LogStatus::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $type = LogStatus::findOrFail($id);
        $type->update($request->validated());
        return $type;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $type = LogStatus::findOrFail($id);
        $type->delete();
        return response()->json(['message' => 'Log status deleted.']);
    }
}
