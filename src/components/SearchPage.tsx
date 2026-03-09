import {useParams} from "react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabase.ts";
import Restaurant from "./Restaurant.tsx";
import getRestaurantImage from "../hooks/getRestaurantImage.ts";


export default function SearchPage () {
    const param = useParams()

        const query = param.query?.split('=')[1]


    const {data: filteredRestaurants} = useSuspenseQuery({
        queryKey: ['restaurant', query],
        queryFn: async () => {
            if(query != undefined){
                const {data} = await supabase.from('restaurants').select().ilike('name', `%${query}%`)
                console.log(data)
                return data
            }else{
                throw new Error('No query')
            }
        }
    })

    const {data: filteredProducts} = useSuspenseQuery({
        queryKey: ['product', query],
        queryFn: async () => {
            if(query != undefined){
                const {data} = await supabase.from('products').select().ilike('name', `%${query}%`)
                return data
            }else{
                throw new Error('No query')
            }
        }
    })



    return (
        <div className='content'>
            <h1>{filteredRestaurants?.length || 0 > 0 ? filteredRestaurants?.length + ' Restaurants found' : 'No restaurants found!'}</h1>
                <div className="restaurant-row">
            {filteredRestaurants?.map(restaurant =>
            <Restaurant slug={restaurant.slug} img={() => getRestaurantImage(restaurant.slug)} title={restaurant.name} id={restaurant.id} deliveryTime={restaurant.delivery_time} deliveryPrice={restaurant.delivery_price}/>)}
                </div>
            <h1>Products</h1>
            {filteredProducts?.map(product => <div>{product.name}</div>)}
        </div>
    )
}