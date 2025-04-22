<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        return Log::paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Log::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Log::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $log = Log::findOrFail($id);
        $log->update($request->validated());
        return $log;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $log = Log::findOrFail($id);
        $log->delete();
        return response()->json(['message' => 'Log deleted.']);
    }
}
