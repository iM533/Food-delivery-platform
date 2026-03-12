import {useContext, useEffect, useState} from 'react'
import {UserContext} from "./UserContext.tsx";
import CartProduct from "./CartProduct.tsx";
import {supabase} from "../api/supabase.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import {Plus} from 'lucide-react';
import Notification from "./Notification.tsx";
import confetti from 'canvas-confetti';


export default function Cart(){
    const contextData = useContext(UserContext)
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if(showNotification){
            const audio = new Audio('sounds/success.wav')
            audio.volume = 0.2;
            audio.play().catch()
            confetti({
                spread: 50,
                particleCount: 50,
                origin: { x: 0.5, y: 1 },
                disableForReducedMotion: true,
            });
        }
    }, [showNotification]);


    const restaurantId = !contextData?.cartItems[0] ? 0 : contextData?.cartItems[0].restaurant_id;
    const {data} = useSuspenseQuery({
        queryKey: ['cart-restaurant', [restaurantId]],
        queryFn: async () => {
            const {data} = await supabase.from('restaurants').select().eq('id', restaurantId!)
            return data
        }
    })

    function handleNotification(){
        if(!showNotification){

            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 2000)
        }
    }
    if (contextData?.cartItems.length === 0 || !contextData!.cartItems[0].restaurant_id){
        return(
            <div className='restaurant-content'>
                <h1>Your cart looks empty</h1>
                <h2>Please add something</h2>
            </div>
        )
    }
    return(
        <div className='restaurant-content'>
            {showNotification && <Notification message='Your demo order placed!'/>}
            <h1>{data![0].name}</h1>
            {contextData?.cartItems.length === 0 && <h1>Your cart is Empty!</h1>}
            {contextData?.cartItems.map((product, i) => <CartProduct
                key={i} title={product.title} price={product.price} quantity={product.quantity}  img={product.img} index={i}
            />)}
            <Link to={`/${contextData?.cartItems[0].restaurant_id}-${data![0].slug}`} className='back-to-restaurant'><Plus className='plus'/><strong>Add more</strong></Link>
            <hr className='spacer'/>
            <div className='subtotal-content'>
                <p>Subtotal: {contextData?.totalAmount?.toFixed(2)} €</p>
                <p>Delivery fee: {(data![0].delivery_price/100).toFixed(2)} €</p>
                <hr className='spacer'/>
                <strong>Total : {(contextData?.totalAmount! + data![0].delivery_price / 100).toFixed(2)} €</strong>
            </div>
            <hr className='spacer'></hr>
            <button className='place-order' onClick={handleNotification}>Place order</button>
        </div>
    )
}