import {useContext} from 'react'
import {UserContext} from "./UserContext.tsx";
import CartProduct from "./CartProduct.tsx";
import {supabase} from "../api/supabase.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Link, Navigate} from "react-router";
import {Plus} from 'lucide-react';


export default function Cart(){
    const contextData = useContext(UserContext)



    if (contextData?.cartItems.length === 0 || !contextData!.cartItems[0].restaurant_id){
        return(<Navigate to='/'/>)
    }
    const restaurantId = contextData!.cartItems[0].restaurant_id;

    const {data} = useSuspenseQuery({
        queryKey: ['cart-restaurant', [contextData?.cartItems[0].restaurant_id]],
        queryFn: async () => {
            const {data} = await supabase.from('restaurants').select().eq('id', restaurantId)
            return data
        }
    })


    return(
        <div className='restaurant-content'>
            <h1>{data![0].name}</h1>
            {contextData?.cartItems.length === 0 && <h1>Your cart is Empty!</h1>}
            {contextData?.cartItems.map((product, i) => <CartProduct
                key={i} title={product.title} price={product.price} quantity={product.quantity}  img={product.img} index={i}
            />)}
            <Link to={`/${contextData?.cartItems[0].restaurant_id}-${data![0].slug}`} className='back-to-restaurant'><Plus className='plus'/><strong>Add more</strong></Link>
            <hr className='spacer'/>
            <div className='subtotal-content'>
                <p>Subtotal: </p>
                <p>Delivery fee: </p>
                <hr className='spacer'/>
                <strong>Total :</strong>
            </div>
            <hr className='spacer'></hr>
            <button className='place-order'>Place order</button>
        </div>
    )
}