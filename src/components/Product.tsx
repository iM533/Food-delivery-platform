import type {Dispatch, SetStateAction} from "react";

export type ProductDetails = {
    title: string,
    description: string,
    price: number,
    img: () => string,
    quantity?: number,
    restaurant_id: number | null,
}

type Props = ProductDetails & {
    setModal: () => void,
    setPopupDetails?: Dispatch<SetStateAction<ProductDetails | undefined>>
}

export default function Product({title, description, price, img, setModal, setPopupDetails, restaurant_id}:Props){

    function handleProductClick(){
            setModal()
            setPopupDetails!({title, description, price, img, restaurant_id})
    }

    return(<>
        <div className='product' onClick={handleProductClick}>
            <div className='text'>
                <div className='title'>{title}</div>
                <div className='description'>{description}</div>
                <div className='price'>{(price).toFixed(2)} €</div>
            </div>
            <div className='image-wrap'>
                <img className='image' src={img()} alt=''/>
            </div>
        </div>
        <hr className='spacer'/>

    </>)
}