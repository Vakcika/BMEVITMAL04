import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { UseQueryResult, useMutation } from "@tanstack/react-query";

export default function useHttpDelete(
  route: string,
  query: UseQueryResult<any> | null = null
) {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: (id: number) => {
      return apiClient.delete(`${route}/${id}`);
    },
    onSuccess: () => {
      query != null ? query.refetch() : {};
    },
  });
}
