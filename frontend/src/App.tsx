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
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}

export default App;
