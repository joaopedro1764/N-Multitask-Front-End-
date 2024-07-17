
import './App.css';
import { Rotas } from './Rotas';
import { BrowserRouter } from 'react-router-dom';
import { queryCliente } from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
