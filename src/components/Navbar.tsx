import {NavLink} from "react-router";
import {UserContext} from './UserContext.tsx'
import {useContext} from 'react'

export default function Navbar(){

    const data = useContext(UserContext)
    return(<>
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
                    <div className='cart'>View basket {data.cartItems.length}</div>
                </div>
                :
                <button className='login-btn' onClick={data?.setAuth}>Login or Register</button>
            }
        </nav>
    <hr style={{border: '1px solid gray'}}></hr>
        </>
    )
}