import {useParams, Navigate} from 'react-router'
import {useSuspenseQuery} from "@tanstack/react-query";
import {Clock, Star, Truck} from 'lucide-react'
import {supabase} from "../api/supabase.ts";

export default function RestaurantDetails(){

    const {restaurantSlug} = useParams()
        if(!restaurantSlug)
            throw new Error('No restaurant slug')
        const id = restaurantSlug.split('-')[0]
        const slug = restaurantSlug.slice(id.length + 1)



     const {data} = useSuspenseQuery({
         queryKey: ['restaurant', id],
         queryFn: async () => {
             const {data} = await supabase.from('restaurants').select().eq('slug', slug).single()
             return data
         }
     })

    const {data: restaurantImage} = supabase.storage.from('delivery-platform-images').getPublicUrl('restaurants/' + slug + '.png');

    if(!slug || !data)
        return <Navigate to='/'></Navigate>
    return(<>
        <div className='restaurant-content'>
            <img src={restaurantImage.publicUrl} alt='Restaurant'/>
            <div className='elements'>
                    <div className='element'>
                <Star size={15} style={{color: 'orange', paddingRight: '5px'}}/>
                <strong>{(data.rating!/100).toFixed(2)}</strong>
                <p>rating</p>
                    </div>
                <hr/>
                    <div className='element'>
                <Truck size={15} style={{paddingRight: '5px'}}/>
                <strong>{(data.delivery_price!/100).toFixed(2)}</strong>
                <p>delivery</p>
                    </div>
                <hr/>
                    <div className='element'>
                <Clock size={15} style={{paddingRight: '5px'}}/>
                <strong>{data.delivery_time!}-{data.delivery_time! + 5}</strong>
                <p>min</p>
                    </div>
            </div>
        </div>
    </>)
}