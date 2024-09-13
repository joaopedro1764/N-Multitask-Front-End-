import { Rotas } from './Rotas';
import { BrowserRouter } from 'react-router-dom';
import { queryCliente } from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { WebSocketProvider } from './hooks/useWebSocketProvider';

function App() {
  return (
    <WebSocketProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryCliente}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CookiesProvider>
    </WebSocketProvider>
  );
}

export default App;
