import { useEffect } from "react";
import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useIsAuthenticated() {
  const apiClient = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(import.meta.env.VITE_API_URL + "api/user")
      //.then((res) => console.log(res))
      .catch((err: any) => {
        const errorMessage =
          err?.response?.data?.message ??
          err?.message ??
          "An error occurred while authenticating.";

        toast.error(errorMessage);
        console.error("Authentication error:", err);
        navigate("/login");
      });
  }, []);
}
