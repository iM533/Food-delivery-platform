import {Plus, Minus} from 'lucide-react';
import type {ProductDetails} from './Product.tsx'

type props = {
    setModal: () => void,
    popupDetails: ProductDetails
}

export default function ProductPopup({setModal, popupDetails}: props){



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
                    <Minus className='minus'/>
                    <div className='quantity'>1</div>
                    <Plus className='plus'/>
                </div>
                <button className='add-to-cart'>Add {popupDetails.price} €</button>
            </div>
        </div>

        </div>
    )
}