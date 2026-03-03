type props = {
    title: string,
    description: string,
    price: number,
    img: () => string,
}

export default function Product({title, description, price, img}:props){

    return(<>
        <div className='product'>
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