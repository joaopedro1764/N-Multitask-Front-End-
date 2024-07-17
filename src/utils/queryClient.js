import { QueryClient } from '@tanstack/react-query';
export const queryCliente = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            
        }
    }
})
