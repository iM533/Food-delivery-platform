import {useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabase.ts";
import Restaurant from '../components/Restaurant.tsx'
import useRestaurantImage from "../hooks/useRestaurantImage.ts";
import {useEffect} from "react";

export default function AppContent(){
    const PAGE_SIZE = 12;

    const {data, fetchNextPage, hasNextPage} = useSuspenseInfiniteQuery({
        queryKey: ["restaurants"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const from = (pageParam - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            const { data, error } = await supabase
                .from("restaurants")
                .select()
                .order("id", { ascending: true })
                .range(from, to);

            if (error) throw error;
            return data ?? [];
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    const restaurants = data.pages.flat()
    useEffect(() => {
        const observer = new IntersectionObserver(scrollCallback, {})
        const intersectedElement = document.querySelector(".scroll-area")
        if (intersectedElement)
        observer.observe(intersectedElement)
        return () => observer.disconnect()
    }, []);


    async function scrollCallback(entries:IntersectionObserverEntry[])  {
        if (entries[0].isIntersecting){
            await fetchNextPage()
        }
    }


    return(<>
        <div className="content">
            <h1>Show all restaurants</h1>
            <div className="restaurant-row" >
                {restaurants.map(e =><Restaurant
                    key={e.id}
                    img={() => useRestaurantImage(e.slug)}
                    title={e.name!}
                    deliveryPrice={e.delivery_price!}
                    deliveryTime={e.delivery_time!}
                    id={e.id}
                    slug={e.slug}
                />)}
            </div>
            {hasNextPage && <div className='scroll-area' style={{width: '100%', height: '1px'}}></div>}
        </div>
        </>
    )
}