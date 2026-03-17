import {Link, NavLink, useNavigate, useLocation} from "react-router";
import {UserContext} from './UserContext.tsx'
import {useContext, type ChangeEvent, useEffect, useRef, useState} from 'react'
import {MoonStar, Sun} from "lucide-react";

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

    function handleThemeSwitch(){
        data?.changeTheme()
    }



    return(
        <nav className={data?.isDarkTheme ? 'navbar dark' : 'navbar'}>
            <div className='main-elements'>
                <Link to='/'><img className='logo' src='/images/navbar-logo.png' alt='logo'/></Link>
                <NavLink to='/'><button className='simple-btn'>Home</button></NavLink>
            </div>
            <input value={input} className='input' type='search' onChange={handleSearch} placeholder='Food, Restaurants...' />
            <div className='last-elements-wrapper'>
                {data?.isDarkTheme
                    ?
                    <Sun className='theme-switch' data-testid="sun" size={30} onClick={handleThemeSwitch}></Sun>
                    :
                    <MoonStar className='theme-switch' data-testid="moon" size={30} onClick={handleThemeSwitch}></MoonStar>}
                {data?.isLoggedIn
                    ?
                    <div className='cart-wrapper'>
                        <NavLink className='login-btn-link' to='/cart'><button className='cart'>View basket {data.totalAmount} €</button></NavLink>
                    </div>
                    :
                    <button className='login-btn' onClick={data?.setAuth}>Login or Register</button>}
            </div>
        </nav>

    )
}