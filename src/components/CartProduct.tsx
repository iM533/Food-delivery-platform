import {Plus, Minus} from 'lucide-react'
import type {ProductDetails} from "./Product.tsx";
import {useContext} from "react";
import {UserContext} from "./UserContext.tsx";

export default function CartProduct({title, quantity, img, price, index}:ProductDetails & {index: number}){
    const userContext = useContext(UserContext);

    function handleDecrease (){
        if (userContext?.cartItems[index].quantity != null){
            if (userContext?.cartItems[index].quantity === 1){
            const newCart = userContext.cartItems.filter((_, i) => i !== index)
                userContext.setNewCart(newCart)
            }else{
                const newCart = userContext.cartItems.map((e, i) =>
                    i === index
                    ? {...e, quantity: e.quantity! - 1}
                    : e)
                userContext.setNewCart(newCart)
            }
        }

    }

    function handleIncrease(){
        if(userContext != null){
            const newCart = userContext.cartItems.map((e, i) =>
                i === index
                    ? {...e, quantity: e.quantity! + 1}
                    : e)
            userContext.setNewCart(newCart)
        }
    }

    return (<>
        <div className='cart-product-wrapper'>
            <img className='cart-image' src={img()} alt={title}></img>
            <div className='text-wrapper'>
                <strong className='cart-title'>{title}</strong>
                <strong className='cart-price'>{price.toFixed(2)} €</strong>
            </div>

            <div className='quantity-wrapper'>
                <div className='border'>
                    <Minus className='minus' onClick={handleDecrease}/>
                    <strong className='quantity'>{quantity}</strong>
                    <Plus className='plus' onClick={handleIncrease}/>
                </div>
            </div>

        </div>
            <hr className='spacer'/>
        </>
    )
}