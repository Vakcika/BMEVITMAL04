<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogType;

class LogTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LogType::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return LogType::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return LogType::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $type = LogType::findOrFail($id);
        $type->update($request->validated());
        return $type;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $type = LogType::findOrFail($id);
        $type->delete();
        return response()->json(['message' => 'Log status deleted.']);
    }
}
