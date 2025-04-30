import { useCallback } from "react";
import { toast } from "sonner";

export default function useExchangeRate() {
  const handleError = (error: any, defaultMessage: string) => {
    toast.error(
      error?.response?.data?.message ?? error?.message ?? defaultMessage
    );
    console.error(error);
  };

  const getExchangeRate = useCallback(
    async (from: string, date: string): Promise<number> => {
      if (from === "HUF") return 1;

      try {
        const response = await fetch(
          `https://api.frankfurter.app/${date}?from=${from}`
        );

        if (!response.ok) {
          handleError(
            new Error(`Failed to fetch exchange rate for ${from} on ${date}`),
            `Failed to fetch exchange rate for ${from} on ${date}`
          );
          return 0;
        }

        const data = await response.json();

        if (!data.rates?.HUF) {
          handleError(
            new Error(`No HUF rate available for ${from} on ${date}`),
            `No HUF rate available for ${from} on ${date}`
          );
          return 0;
        }

        return data.rates.HUF;
      } catch (error) {
        handleError(
          error,
          `Failed to fetch exchange rate for ${from} on ${date}`
        );
        return 0;
      }
    },
    []
  );

  return { getExchangeRate };
}
