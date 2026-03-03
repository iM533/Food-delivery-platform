import { StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from './App.tsx'
import Navbar from "./components/Navbar.tsx";

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Navbar></Navbar>
      <Suspense fallback={<div className='loader-content'><div className='loader'/></div>}>
          <QueryClientProvider client={client}>
              <App />
          </QueryClientProvider>
      </Suspense>
  </StrictMode>,
)
