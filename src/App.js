import { Rotas } from './Rotas';
import { BrowserRouter } from 'react-router-dom';
import { queryCliente } from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryCliente}>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
