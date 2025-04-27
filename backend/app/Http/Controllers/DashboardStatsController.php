<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Transaction;
use App\Models\CustomerStatus;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardStatsController extends Controller
{
    public function customerBalances()
    {
        // Get all transactions with their customers and types
        $transactions = Transaction::with(['customer', 'type'])->get();

        // Group transactions by customer
        $grouped = $transactions->groupBy('customer_id');

        return $grouped->map(function ($transactions, $customerId) {
            $customer = $transactions->first()->customer;

            $balance = round($transactions->sum(function ($t) {
                if (!$t->type) return 0;
                return $t->type->name === 'income'
                    ? $t->amount_in_base
                    : -$t->amount_in_base;
            }));

            return [
                'customer_id' => $customerId,
                'customer_name' => $customer->company_name ?? $customer->name,
                'balance' => $balance,
            ];
        })->values(); // Convert to indexed array
    }


    public function companyBalance()
    {
        $transactions = Transaction::with(['currency', 'type'])->get();

        return [
            'total_in_base' => round($transactions->sum(function ($t) {
                return $t->type->name === 'income'
                    ? $t->amount_in_base
                    : -$t->amount_in_base;
            })),
            'currencies' => $transactions->groupBy('currency.code')
                ->map(function ($group) {
                    return $group->sum(function ($t) {
                        return $t->type->name === 'income'
                            ? $t->amount_in_base
                            : -$t->amount_in_base;
                    });
                })
        ];
    }

    public function monthlyIncomeExpense()
    {
        $year = now()->year;
        $results = Transaction::with('type')
            ->whereYear('transaction_date', $year)
            ->get()
            ->groupBy(function ($t) {
                return Carbon::parse($t->transaction_date)->format('m');
            });

        return collect(range(1, 12))->map(function ($month) use ($results) {
            $monthKey = str_pad($month, 2, '0', STR_PAD_LEFT);
            $group = $results->get($monthKey) ?? collect();

            return [
                'month' => $monthKey,
                'income' => round($group->where('type.name', 'income')->sum('amount_in_base')),
                'expense' => round($group->where('type.name', 'expense')->sum('amount_in_base') * -1)
            ];
        });
    }

    public function customerCountByMonth()
    {
        $year = now()->year;
        $results = Customer::whereYear('created_at', $year)
            ->get()
            ->groupBy(function ($c) {
                return Carbon::parse($c->created_at)->format('m');
            });

        return collect(range(1, 12))->map(function ($month) use ($results) {
            $monthKey = str_pad($month, 2, '0', STR_PAD_LEFT);

            return [
                'month' => $monthKey,
                'count' => $results->get($monthKey) ? $results->get($monthKey)->count() : 0
            ];
        });
    }

    public function customerStatusPie()
    {
        return DB::table('customers')
            ->join('customer_statuses', 'customers.status_id', '=', 'customer_statuses.id')
            ->select('customer_statuses.name', DB::raw('COUNT(customers.id) as count'))
            ->groupBy('customer_statuses.name')
            ->get();
    }

    public function subscriptionIncomeRate()
    {
        $total = Transaction::count();
        $subscriptionCount = Transaction::has('subscription')->count();
        $nonSubscriptionCount = $total - $subscriptionCount;

        return [
            'subscription' => $subscriptionCount,
            'non_subscription' => $nonSubscriptionCount,
            'percentage' => $total > 0
                ? ($subscriptionCount / $total) * 100
                : 0
        ];
    }
}
