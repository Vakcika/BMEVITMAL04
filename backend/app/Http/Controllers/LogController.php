<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;
use App\Http\Resources\LogResource;
use App\Http\Requests\LogRequest;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'customer' => 'nullable|string|exists:customers,id',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Log::query();

        if (!empty($validated['customer'])) {
            $query->whereHas('customer', function ($q) use ($validated) {
                $q->where('id', $validated['customer']);
            });
        }
        $query->orderBy('id', 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;
        $transactions = $query->paginate($perPage, ['*'], 'page', $page);

        return LogResource::collection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LogRequest $request)
    {
        return Log::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new LogResource(Log::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LogRequest $request, string $id)
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
