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

const authConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  loginUrl: "api/login",
  registerUrl: "api/register",
  logoutUrl: "api/logout",
  csrfCookieUrl: "sanctum/csrf-cookie",
};

const queryClient = new QueryClient();

function AppLayout() {
  return (
    <div className="sm:ml-16 sm:pl-20 lg:ml-48 m-4">
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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Page404 />} />
                <Route path="customers" element={<Page404 />} />
                <Route path="finance" element={<Page404 />} />
                <Route path="test" element={<Page404 />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
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
