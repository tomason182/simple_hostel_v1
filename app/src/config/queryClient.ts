import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,

      refetchOnWindowFocus: false,

      // staleTime: Lo va a manejar cada consulta segun sea necesario.
    }
  }
});
