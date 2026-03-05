import {NavLink} from "react-router";
import {UserContext} from './UserContext.tsx'
import {useContext, useEffect, useState} from 'react'

export default function Navbar(){
    const data = useContext(UserContext)
    const [totalAmount, setTotalAmount] = useState<number | undefined>(0)
    useEffect(() => {
        setTotalAmount(data?.cartItems.reduce((acc, item) => acc + item.price * item.quantity!, 0))
    },[data?.cartItems])
    return(
        <nav className='navbar'>
            <div className='main-elements'>
                <a className='logo'>Logo</a>
                <NavLink to='/'><button className='simple-btn'>Main</button></NavLink>
                <button className='simple-btn'>Shop</button>
            </div>
            <input className='input' type='search' placeholder='Food, Restaurants...'/>
            {data?.isLoggedIn
                ?
                <div className='cart-wrapper'>
                    <div className='cart'>View basket {totalAmount} €</div>
                </div>
                :
                <button className='login-btn' onClick={data?.setAuth}>Login or Register</button>
            }
        </nav>

    )
}