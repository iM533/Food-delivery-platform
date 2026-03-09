import {Link, NavLink} from "react-router";
import {UserContext} from './UserContext.tsx'
import {useContext} from 'react'

export default function Navbar(){
    const data = useContext(UserContext)

    return(
        <nav className='navbar'>
            <div className='main-elements'>
                <Link to='/'><img className='logo' src='../../public/images/navbar-logo.png' alt='logo'/></Link>
                <NavLink to='/'><button className='simple-btn'>Home</button></NavLink>
            </div>
            <input className='input' type='search' placeholder='Food, Restaurants...'/>
            {data?.isLoggedIn
                ?
                <div className='cart-wrapper'>
                    <NavLink className='login-btn-link' to='/cart'><div className='cart'>View basket {data.totalAmount} €</div></NavLink>
                </div>
                :
                <button className='login-btn' onClick={data?.setAuth}>Login or Register</button>
            }
        </nav>

    )
}