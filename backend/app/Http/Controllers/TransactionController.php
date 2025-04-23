<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use App\Http\Requests\TransactionRequest;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'currency' => 'nullable|string|exists:currencies,code',
            'sort_by' => 'nullable|in:amount,amount_in_base,transaction_date,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
        ]);

        $query = Transaction::query();

        if (!empty($validated['currency'])) {
            $query->whereHas('currency', function ($q) use ($validated) {
                $q->where('code', $validated['currency']);
            });
        }

        if (!empty($validated['sort_by'])) {
            $query->orderBy(
                $validated['sort_by'],
                $validated['sort_dir'] ?? 'asc'
            );
        } else{
            $query->orderBy($validated['sort_by'] ?? 'transaction_date', $validated['sort_dir'] ?? 'desc');
        }

        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);

        $transactions = $query->paginate($perPage, ['*'], 'page', $page);

        return TransactionResource::collection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();
        return Transaction::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new TransactionResource(Transaction::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionRequest $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->validated());
        return $transaction;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted.']);
    }
}
