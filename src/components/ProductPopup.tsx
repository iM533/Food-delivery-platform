import {Plus, Minus} from 'lucide-react';
import type {ProductDetails} from './Product.tsx'
import {useContext} from "react";
import {UserContext} from "./UserContext.tsx";

type props = {
    setModal: () => void,
    popupDetails: ProductDetails
}

export default function ProductPopup({setModal, popupDetails}: props){

    const contextData = useContext(UserContext)
    function handleAddProduct(product:ProductDetails){
        if(contextData?.isLoggedIn){
            contextData?.addItem({...product, quantity: contextData.currentQuantity, restaurant_id: popupDetails.restaurant_id});
        }else{
            alert('You need to login first!')
        }

    }

    return(
        <div className='popup-backdrop' onClick={() => setModal()}>

        <div className='restaurant-popup' onClick={e => e.stopPropagation()}>
            <button className='close-button' onClick={() => setModal()}>X</button>
            <img src={popupDetails.img()} alt='test'></img>
            <div className='text-wrap'>
                <div className='title'>{popupDetails.title}</div>
                <div className='price'>{popupDetails.price.toFixed(2)} €</div>
                <div className='description'>{popupDetails.description}</div>
            </div>
            <div className='buttons'>
                <div className='change-amount'>
                    <Minus className='minus' onClick={contextData?.decreaseQuantity}/>
                    <div className='quantity'>{contextData?.currentQuantity}</div>
                    <Plus className='plus' onClick={contextData?.addQuantity}/>
                </div>
                <button className='add-to-cart' onClick={() => handleAddProduct(popupDetails)}>Add {(popupDetails.price * contextData?.currentQuantity!).toFixed(2)} €</button>
            </div>
        </div>

        </div>
    )
}