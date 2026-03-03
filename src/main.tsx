import { StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from './App.tsx'
import Navbar from "./components/Navbar.tsx";
import Loader from './components/Loader.tsx'
import {ErrorBoundary} from "react-error-boundary";
import {Route, Routes, BrowserRouter} from 'react-router'
import RestaurantDetails from "./components/RestaurantDetails.tsx";
const client = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <Navbar/>
      <ErrorBoundary fallback={<h1>Something unexpected happened!</h1>}>
      <Suspense fallback={<Loader></Loader>}>
          <QueryClientProvider client={client}>
              <Routes>
                  <Route path='/' element={<App/>}></Route>
                  <Route path='/:restaurantSlug' element={<RestaurantDetails/>}></Route>
              </Routes>
          </QueryClientProvider>
      </Suspense>
      </ErrorBoundary>
      </BrowserRouter>
  </StrictMode>,
)
