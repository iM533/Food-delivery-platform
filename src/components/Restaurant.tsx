import {Clock, Truck} from 'lucide-react'
import {Link} from 'react-router'

type RestaurantProps = {
    img: () => string,
    title: string,
    deliveryPrice: number,
    deliveryTime: number,
    id: number,
    slug: string,
}

export default function Restaurant({img, deliveryPrice, deliveryTime , title, id, slug}:RestaurantProps ){
    return(
    <Link className='restaurant' data-testid="restaurant-card" to={`/${id}-${slug}`}>
        <img className='img' src={img()} alt={title} loading='lazy'/>
        <strong className='title'>{title}</strong>
        <div className='delivery-row'>
            <strong className='delivery-price'><Truck size={10} style={{marginRight: '5px'}}/>{(deliveryPrice/100).toFixed(2)} €</strong>
           <strong className='delivery-time'> <Clock size={10} style={{marginRight: '5px'}}/>{deliveryTime}-{deliveryTime+5} min</strong>
        </div>
    </Link>
    )
}