import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { useQuery } from "@tanstack/react-query";

export default function useHttpGet<T>(route: string) {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["get", route],
    queryFn: () => {
      return apiClient.get<T>(route).then((res) => res.data);
    },
  });
}
