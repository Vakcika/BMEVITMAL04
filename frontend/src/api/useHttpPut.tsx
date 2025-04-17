import { useApiClient } from "@webbydevs/react-laravel-sanctum-auth";
import { UseQueryResult, useMutation } from "@tanstack/react-query";

export default function useHttpPut(
  route: string,
  query: UseQueryResult<any> | null = null
) {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: (object: any) => {
      return apiClient.put(`${route}/${object.id}`, object);
    },
    onSuccess: () => {
      query != null ? query.refetch() : {};
    },
  });
}
