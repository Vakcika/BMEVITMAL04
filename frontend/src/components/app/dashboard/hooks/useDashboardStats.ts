import useHttpGet from "@/api/useHttpGet";

export default function useDashboardStats() {
  const customerBalancesQuery = useHttpGet<any[]>("/api/customer-balances");
  const companyBalanceQuery = useHttpGet<any>("/api/company-balance");
  const monthlyIncomeExpenseQuery = useHttpGet<any[]>(
    "/api/monthly-income-expense"
  );
  const customerCountQuery = useHttpGet<any[]>("/api/customer-count");
  const customerStatusDistributionQuery = useHttpGet<any[]>(
    "/api/customer-status-distribution"
  );
  const subscriptionIncomeRateQuery = useHttpGet<any>(
    "/api/subscription-income-rate"
  );

  return {
    customerBalances: customerBalancesQuery.data ?? [],
    companyBalance: companyBalanceQuery.data ?? {},
    monthlyIncomeExpense: monthlyIncomeExpenseQuery.data ?? [],
    customerCount: customerCountQuery.data ?? [],
    customerStatusPie: customerStatusDistributionQuery.data ?? [],
    subscriptionIncomeRate: subscriptionIncomeRateQuery.data ?? [],
    isLoading: {
      customerBalances: customerBalancesQuery.isLoading,
      companyBalance: companyBalanceQuery.isLoading,
      monthlyIncomeExpense: monthlyIncomeExpenseQuery.isLoading,
      customerCount: customerCountQuery.isLoading,
      customerStatusPie: customerStatusDistributionQuery.isLoading,
      subscriptionIncomeRate: subscriptionIncomeRateQuery.isLoading,
    },
  };
}
