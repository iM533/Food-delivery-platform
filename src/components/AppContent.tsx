import {useSuspenseQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabase.ts";
import type {Tables} from "../types/database.types.ts";
import Restaurant from '../components/Restaurant.tsx'
import useRestaurantImage from "../hooks/useRestaurantImage.ts";
import {useEffect} from "react";

type Restaurant = Tables<'restaurants'>;



export default function AppContent(){
    const {data: restaurants} = useSuspenseQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const {data} = await supabase.from('restaurants').select().order('id', {ascending: true}).range(0, 11)
            return data || [];
        },
    })

    useEffect(() => {
        const observer = new IntersectionObserver(scrollCallback, {})
        const intersectedElement = document.querySelector("#scrollArea")
        if (intersectedElement)
        observer.observe(intersectedElement)
        return () => observer.disconnect()
    }, []);


    async function scrollCallback(entries:IntersectionObserverEntry[])  {
        if (entries[0].isIntersecting){
            const {data} = await supabase.from('restaurants').select().order('id', {ascending: true}).range(0, (restaurants.length - 1) + 12)
            if(data){
                if(data?.length < (restaurants.length - 1) + 12){

                }
            }
        }
    }


    return(
        <div className="content">
            <h1>Show all restaurants</h1>
            <div className="restaurant-row">
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
            <div id='scrollArea' style={{width: '100%', height: '30px', backgroundColor: 'red'}}></div>
        </div>
    )
}