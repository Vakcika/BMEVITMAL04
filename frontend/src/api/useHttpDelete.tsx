import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { UseQueryResult, useMutation } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useHttpDelete(
  route: string,
  query: UseQueryResult<any> | null = null
) {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: (id: number | UUID) => {
      return apiClient.delete(`${route}/${id}`);
    },
    onSuccess: () => {
      query != null ? query.refetch() : {};
    },
  });
}
