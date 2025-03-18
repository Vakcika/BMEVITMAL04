import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { UseQueryResult, useMutation } from "@tanstack/react-query";

export default function useHttpPost(
  route: string,
  query: UseQueryResult<any> | null = null
) {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: (object: any) => {
      return apiClient.post(`${route}`, object);
    },
    onSuccess: () => {
      query != null ? query.refetch() : {};
    },
  });
}
