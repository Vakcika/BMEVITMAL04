import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import { Suspense } from "react";
import LoadingCircle from "./components/common/LoadingCircle";
import SideBar from "./components/sidebar/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@webbydevs/react-laravel-sanctum-auth";
import { Toaster } from "sonner";
import useIsAuthenticated from "./auth/useIsAuthenticated";
import ListCustomers from "./components/app/customers/ListCustomers";
import ViewCustomer from "./components/app/customers/ViewCustomer";
import EditCustomer from "./components/app/customers/EditCustomer";
import ListTransactions from "./components/app/transactions/ListTransactions";
import EditTransaction from "./components/app/transactions/EditTransaction";
import ViewTransaction from "./components/app/transactions/ViewTransaction";
import Dashboard from "./components/app/dashboard/Dashboard";
import { LogDialogProvider } from "./components/app/logs/LogDialogProvider";
import EditSubscription from "./components/app/subscriptions/EditSubscription";
import ViewSubscription from "./components/app/subscriptions/ViewSubscription";
import ListSubscriptions from "./components/app/subscriptions/ListSubscriptions";

const authConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  loginUrl: "api/login",
  registerUrl: "api/register",
  logoutUrl: "api/logout",
  csrfCookieUrl: "sanctum/csrf-cookie",
};

const queryClient = new QueryClient();

function AppLayout() {
  useIsAuthenticated();

  return (
    <div className="sm:ml-16 sm:pl-20 lg:ml-48 m-4 relative min-h-screen">
      <Suspense fallback={<LoadingCircle />}>
        <SideBar />
        <Outlet />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider config={authConfig}>
          <LogDialogProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="customers" element={<ListCustomers />} />
                  <Route
                    path="/app/customer/new"
                    element={<EditCustomer isNew={true} />}
                  />
                  <Route path="/app/customer/:id" element={<ViewCustomer />} />
                  <Route
                    path="/app/customer/:id/edit"
                    element={<EditCustomer />}
                  />
                  <Route path="transactions" element={<ListTransactions />} />
                  <Route
                    path="/app/transaction/new"
                    element={<EditTransaction isNew={true} />}
                  />
                  <Route
                    path="/app/transaction/:id"
                    element={<ViewTransaction />}
                  />
                  <Route
                    path="/app/transaction/:id/edit"
                    element={<EditTransaction />}
                  />
                  <Route path="subscriptions" element={<ListSubscriptions />} />
                  <Route
                    path="/app/subscription/new"
                    element={<EditSubscription isNew={true} />}
                  />
                  <Route
                    path="/app/subscription/:id"
                    element={<ViewSubscription />}
                  />
                  <Route
                    path="/app/subscription/:id/edit"
                    element={<EditSubscription />}
                  />
                </Route>
                <Route path="*" element={<Page404 />} />
              </Routes>
            </BrowserRouter>
          </LogDialogProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster
        position="bottom-right"
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group rounded-md border p-4 shadow-lg bg-n700 border-n600 text-p100 gap-3",
            error: "!bg-w50 !border-w300 !text-w500",
            success: "!bg-s50 !border-s300 !text-s500",
            warning: "!bg-p50 !border-p300 !text-p800",
            info: "!bg-b50 !border-b300 !text-b500",
            title: "font-medium",
            description: "text-sm",
            actionButton:
              "group-data-[type=error]:!bg-w300 group-data-[type=error]:!text-n0",
            closeButton: "group-data-[type=error]:!text-w400",
          },
        }}
      />
    </div>
  );
}

export default App;
