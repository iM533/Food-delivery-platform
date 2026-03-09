import {useNavigate} from "react-router";
import {supabase} from "../api/supabase.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import type {ProductDetails} from "./Product.tsx";

export default function SearchProduct({img, title, price, restaurant_id}: ProductDetails){
    const navigate = useNavigate();

    const {data: restaurantSlug} = useSuspenseQuery({
        queryKey: ['slug', restaurant_id],
        queryFn: async() => {
            const {data} = await supabase.from('restaurants').select('slug').eq('id', restaurant_id!).single()
            return data;
        }
    })

    return (<>
        <div className='product-box' onClick={() => navigate(`/${restaurant_id}-${restaurantSlug!.slug}`)}>
            <img src={img()} alt=''></img>
            <p className='price'>{price.toFixed(2)} €</p>
            <p className='title'>{title}</p>
        </div>
        </>
    )
}