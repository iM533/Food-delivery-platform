import {useParams} from "react-router";
import {useSuspenseQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabase.ts";
import Restaurant from "./Restaurant.tsx";
import useRestaurantImage from "../hooks/useRestaurantImage.ts";
import SearchProduct from "./SearchProduct.tsx";


export default function SearchPage () {
    const param = useParams()

    const query = param.query?.split('=')[1]


    const {data: filteredRestaurants} = useSuspenseQuery({
        queryKey: ['restaurant', query],
        queryFn: async () => {
            if(query != undefined){
                const {data} = await supabase.from('restaurants').select().ilike('name', `%${query}%`)
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

    function getProductImage(){
        const {data: productImage} = supabase.storage.from('delivery-platform-images').getPublicUrl('nothing.png');
        return productImage.publicUrl;
    }


    return (
        <div className='content'>
            <h1>{filteredRestaurants?.length || 0 > 0 ? filteredRestaurants?.length + ' Restaurants found' : 'No restaurants found!'}</h1>
                <div className="restaurant-row">
            {filteredRestaurants?.map(restaurant =>
            <Restaurant key={restaurant.id} slug={restaurant.slug} img={() => useRestaurantImage(restaurant.slug)} title={restaurant.name} id={restaurant.id} deliveryTime={restaurant.delivery_time} deliveryPrice={restaurant.delivery_price}/>)}
                </div>
            <h1>{filteredProducts?.length || 0 > 0 ? filteredProducts?.length + ' Products found' : 'No products found!'}</h1>
            <div className="product-row">
                {filteredProducts?.map(product => <SearchProduct key={product.id} restaurant_id={product.restaurant_id!} img={getProductImage} title={product.name} price={product.price} />)}
            </div>

        </div>
    )
}