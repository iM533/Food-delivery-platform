import {MemoryRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {type ReactNode, Suspense} from "react";
import {render} from "vitest-browser-react";


export default async function renderWithQuery(ui: ReactNode){
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    })
    return ( await render(

    <QueryClientProvider client={queryClient}>
        <MemoryRouter>
            <Suspense fallback={<div>Waiting for page to load...</div>}>{ui}</Suspense>
        </MemoryRouter>
    </QueryClientProvider>
    ))
}