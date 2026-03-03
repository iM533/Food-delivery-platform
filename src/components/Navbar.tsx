import {NavLink} from "react-router";

export default function Navbar(){
    return(<>
        <nav className='navbar'>
            <div className='main-elements'>
                <a className='logo'>Logo</a>
                <NavLink to='/'><button className='simple-btn'>Main</button></NavLink>
                <button className='simple-btn'>Shop</button>
            </div>
            <input className='input' type='search' placeholder='Food, Restaurants...'/>
            <button className='login-btn'>Login or Register</button>
        </nav>
    <hr style={{border: '1px solid gray'}}></hr>
        </>
    )
}