export default function Navbar(){
    return(<>
        <nav className='navbar'>
            <div className='main-elements'>
                <a className='logo'>Logo</a>
                <button className='simple-btn'>Main</button>
                <button className='simple-btn'>Shop</button>
            </div>
            <input className='input' type='search' placeholder='Search for a restaurant or dish...'/>
            <button className='login-btn'>Login or Register</button>
        </nav>
    <hr style={{border: '1px solid gray'}}></hr>
        </>
    )
}