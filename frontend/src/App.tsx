import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import { Suspense } from "react";
import LoadingCircle from "./components/common/LoadingCircle";
import SideBar from "./components/sidebar/Sidebar";

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
  );
}

export default App;
