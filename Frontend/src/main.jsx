import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom';
import queryClient from './Services/queryClient.js';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
