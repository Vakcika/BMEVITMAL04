import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import useDashboardStats from "./hooks/useDashboardStats";
import { CompanyBalancePieChart } from "./components/charts/CompanyBalancePieChart";
import { MonthlyIncomeExpenseChart } from "./components/charts/MonthlyIncomeExpenseChart";
import { CustomerCountChart } from "./components/charts/CustomerCountLineChart";
import { CustomerStatusPieChart } from "./components/charts/CustomerStatusPieChart";
import { SubscriptionRateChart } from "./components/charts/SubscriptionRateAreaChart";
import { CustomerBalancesList } from "./components/charts/CustomerBalancesList";
import { Loader2 } from "lucide-react";
import { DashboardCard } from "./components/DashboardCard";
import { DashboardChartCard } from "./components/DashboardChartCard";

export default function Dashboard() {
  const {
    customerBalances,
    companyBalance,
    monthlyIncomeExpense,
    customerCount,
    customerStatusPie,
    subscriptionIncomeRate,
    isLoading,
  } = useDashboardStats();

  return (
    <div className="p-4 space-y-6">
      <CustomBreadCrumb
        model={[{ label: "Dashboard", url: "/app/dashboard" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Company Balance">
          {isLoading.companyBalance ? (
            <div className="flex items-center justify-center h-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {companyBalance.total_in_base?.toLocaleString("hu-HU", {
                  style: "currency",
                  currency: "HUF",
                  minimumFractionDigits: 0,
                })}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                All currencies combined
              </div>
            </div>
          )}
        </DashboardCard>
        <DashboardCard title="Company Balance (HUF)">
          {isLoading.companyBalance ? (
            <div className="flex items-center justify-center h-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {companyBalance.currencies.HUF?.toLocaleString("hu-HU", {
                  style: "currency",
                  currency: "HUF",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          )}
        </DashboardCard>
        <DashboardCard title="Company Balance (EUR)">
          {isLoading.companyBalance ? (
            <div className="flex items-center justify-center h-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {companyBalance.currencies.EUR?.toLocaleString("eu-EU", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          )}
        </DashboardCard>
        <DashboardCard title="Company Balance (USD)">
          {isLoading.companyBalance ? (
            <div className="flex items-center justify-center h-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {companyBalance.currencies.USD?.toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          )}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardChartCard
          title="Company Balance by Currency"
          description="Distribution across all currencies"
          height={300}
        >
          {isLoading.companyBalance ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CompanyBalancePieChart data={companyBalance.currencies ?? {}} />
          )}
        </DashboardChartCard>

        <DashboardChartCard
          title="Customer Status Distribution"
          description="Current status of all not failed customers"
          height={300}
        >
          {isLoading.customerStatusPie ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CustomerStatusPieChart data={customerStatusPie} />
          )}
        </DashboardChartCard>

        <DashboardChartCard
          title="Monthly Income and Expenses"
          description="Last 12 months financial summary"
          height={300}
        >
          {isLoading.monthlyIncomeExpense ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <MonthlyIncomeExpenseChart data={monthlyIncomeExpense} />
          )}
        </DashboardChartCard>

        <DashboardChartCard
          title="New Customers by Month"
          description="Customer acquisition trend"
          height={300}
        >
          {isLoading.customerCount ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CustomerCountChart data={customerCount} />
          )}
        </DashboardChartCard>

        <DashboardChartCard
          title="Top Customer Balances"
          description="Ranked by current account balance"
          height={300}
        >
          {isLoading.customerBalances ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CustomerBalancesList data={customerBalances} />
          )}
        </DashboardChartCard>

        <DashboardChartCard
          title="Subscriptions Income Rate"
          description="Monthly subscription revenue growth compared to all income"
          height={300}
        >
          {isLoading.subscriptionIncomeRate ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <SubscriptionRateChart data={subscriptionIncomeRate} />
          )}
        </DashboardChartCard>
      </div>
    </div>
  );
}
