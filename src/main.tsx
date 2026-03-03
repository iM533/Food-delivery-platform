import { StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from './App.tsx'
import Navbar from "./components/Navbar.tsx";
import Loader from './components/Loader.tsx'
import {ErrorBoundary} from "react-error-boundary";
import {Route, Routes, BrowserRouter} from 'react-router'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Navbar></Navbar>
      <BrowserRouter>
      <ErrorBoundary fallback={<h1>Something unexpected happened!</h1>}>
      <Suspense fallback={<Loader></Loader>}>
          <QueryClientProvider client={client}>
              <Routes>
                  <Route path='/' element={<App/>}></Route>
              </Routes>
          </QueryClientProvider>
      </Suspense>
      </ErrorBoundary>
      </BrowserRouter>
  </StrictMode>,
)
