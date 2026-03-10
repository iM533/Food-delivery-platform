import {Link, NavLink, useNavigate, useLocation} from "react-router";
import {UserContext} from './UserContext.tsx'
import {useContext, type ChangeEvent, useEffect, useRef, useState} from 'react'

export default function Navbar(){
    const data = useContext(UserContext)
    const navigate = useNavigate()
    const url = useLocation()

    const debouncedTimeout = useRef<number | null>(null)
    const [input, setInput] = useState('');

    useEffect(() => {
    if (!url.pathname.includes('search'))
        setInput('')
    }, [url.pathname])

    function handleSearch(event:ChangeEvent<HTMLInputElement>){
        setInput(event.target.value)
        if (debouncedTimeout.current){
            clearTimeout(debouncedTimeout.current)
        }

        debouncedTimeout.current = setTimeout(() => {
        !event.target.value ? navigate('/') : navigate('/search/query=' + event.target.value)
        },500)
    }



    return(
        <nav className='navbar'>
            <div className='main-elements'>
                <Link to='/'><img className='logo' src='/images/navbar-logo.png' alt='logo'/></Link>
                <NavLink to='/'><button className='simple-btn'>Home</button></NavLink>
            </div>
            <input value={input} className='input' type='search' onChange={handleSearch} placeholder='Food, Restaurants...' />
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