import { useEffect } from "react";
import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { useNavigate } from "react-router-dom";

export default function useIsAuthenticated() {
  const apiClient = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("http://localhost:8000/api/user")
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("Authentication error:", err);
        navigate("/login");
      });
  }, []);
}
