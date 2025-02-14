import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Navbar() {
    const cartData = useSelector((store) => store.cartSlice.cartItems);
    const cartQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <nav className="navbar navbar-light bg-light position-fixed top-0 left-0 w-100">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    E-commerce Cart
                </Link>
                <Link to="/cart" className='me-4 position-relative'><span className='cart_count'>{cartQuantity}</span><img src="images/cart.svg" alt="" width={30} /></Link>
            </div>
        </nav>
    )
}
