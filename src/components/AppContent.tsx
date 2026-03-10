import {useSuspenseQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabase.ts";
import type {Tables} from "../types/database.types.ts";
import Restaurant from '../components/Restaurant.tsx'
import useRestaurantImage from "../hooks/useRestaurantImage.ts";

type Restaurant = Tables<'restaurants'>;
type Data = {
    data: Restaurant[]
}


export default function AppContent(){

    const {data: restaurants}:Data = useSuspenseQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const {data} = await supabase.from('restaurants').select()
            return data
        }
    })


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
        </div>
    )
}