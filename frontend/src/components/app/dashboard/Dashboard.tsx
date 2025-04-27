import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import useDashboardStats from "./hooks/useDashboardStats";
import CompanyBalancePieChart from "./components/charts/CompanyBalancePieChart";
import DashboardChartCard from "./components/DashboardChartCard";
import MonthlyIncomeExpenseChart from "./components/charts/MonthlyIncomeExpenseChart";
import CustomerCountChart from "./components/charts/CustomerCountLineChart";
import DashboardCard from "./components/DashboardCards";
import { CustomerStatusPieChart } from "./components/charts/CustomerStatusPieChart";
import { SubscriptionRateChart } from "./components/charts/SubscriptionRateAreaChart";
import { CustomerBalancesList } from "./components/charts/CustomerBalancesList";

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
        <DashboardCard title="Total Company Balance (HUF)">
          <div className="text-2xl font-bold">
            {isLoading.companyBalance ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              companyBalance.total_in_base?.toLocaleString("hu-HU", {
                style: "currency",
                currency: "HUF",
              })
            )}
          </div>
        </DashboardCard>
        <DashboardCard title="Company Balance (HUF)">
          <div className="text-2xl font-bold">
            {isLoading.companyBalance ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              companyBalance.currencies.HUF?.toLocaleString("hu-HU", {
                style: "currency",
                currency: "HUF",
              })
            )}
          </div>
        </DashboardCard>
        <DashboardCard title="Company Balance (EUR)">
          <div className="text-2xl font-bold">
            {isLoading.companyBalance ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              companyBalance.currencies.EUR?.toLocaleString("eu-EU", {
                style: "currency",
                currency: "EUR",
              })
            )}
          </div>
        </DashboardCard>
        <DashboardCard title="Company Balance (USD)">
          <div className="text-2xl font-bold">
            {isLoading.companyBalance ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              companyBalance.currencies.USD?.toLocaleString("us-US", {
                style: "currency",
                currency: "USD",
              })
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardChartCard title="Company Balance by Currency">
          <CompanyBalancePieChart data={companyBalance.currencies ?? {}} />
        </DashboardChartCard>

        <DashboardChartCard title="Customer Status Distribution">
          <CustomerStatusPieChart data={customerStatusPie} />
        </DashboardChartCard>

        <DashboardChartCard title="Monthly Income and Expenses">
          <MonthlyIncomeExpenseChart data={monthlyIncomeExpense} />
        </DashboardChartCard>

        <DashboardChartCard title="New Customers by Month">
          <CustomerCountChart data={customerCount} />
        </DashboardChartCard>
        <DashboardChartCard title="Customer Balances">
          {isLoading.customerBalances ? (
            <div>Loading...</div>
          ) : (
            <CustomerBalancesList data={customerBalances} />
          )}
        </DashboardChartCard>
        <DashboardChartCard title="Subscription Income Rate">
          {isLoading.subscriptionIncomeRate ? (
            <div>Loading...</div>
          ) : (
            <SubscriptionRateChart data={subscriptionIncomeRate} />
          )}
        </DashboardChartCard>
      </div>
    </div>
  );
}
