import {Clock} from 'lucide-react'
import {Truck} from 'lucide-react'

type RestaurantProps = {
    img: () => string,
    title: string,
    deliveryPrice: number,
    deliveryTime: number
}

export default function Restaurant({img, deliveryPrice, deliveryTime , title}:RestaurantProps ){
    return(
    <div className='restaurant'>
        <img className='img' src={img()} alt={title}/>
        <strong className='title'>{title}</strong>
        <div className='delivery-row'>
            <strong className='delivery-price'><Truck size={10} style={{marginRight: '5px'}}/>{(deliveryPrice/100).toFixed(2)} €</strong>
           <strong className='delivery-time'> <Clock size={10} style={{marginRight: '5px'}}/>{deliveryTime}-{deliveryTime+5} min</strong>
        </div>
    </div>
    )
}