import {useNavigate} from "react-router";
import {supabase} from "../api/supabase.ts";
import type {ProductDetails} from "./Product.tsx";

export default function SearchProduct({img, title, price, restaurant_id}: ProductDetails){
    const navigate = useNavigate();


    async function handleRedirect(){
        const {data: restaurantSlug} = await supabase.from('restaurants').select('slug').eq('id', restaurant_id!).single()
        navigate(`/${restaurant_id}-${restaurantSlug!.slug}`)
    }

    return (<>
        <div className='product-box' onClick={handleRedirect}>
            <img src={img()} alt=''></img>
            <p className='price'>{price.toFixed(2)} €</p>
            <p className='title'>{title}</p>
        </div>
        </>
    )
}