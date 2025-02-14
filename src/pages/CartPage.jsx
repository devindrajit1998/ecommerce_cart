import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrement, increment, removeSingle } from '../redux/slices/CartSlice';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartData = useSelector((store) => store.cartSlice.cartItems);

    const handleDecrement = (id) => {
        dispatch(decrement(id));
        const currentProduct = cartData.find(item => item.id === id);
        if (currentProduct.quantity === 1) {
            dispatch(removeSingle(id));
        }
    };

    const cartTotalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="container card_section">
            {cartData?.length > 0 ? <>
                <h2 className="mb-4">Shopping Cart</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData?.map((cartItem) => {
                                return (
                                    <tr key={cartItem.id}>
                                        <td>
                                            <img src={cartItem.image} alt="Product Image" className="img-fluid me-3" style={{ width: 50, height: 50 }} />
                                            {cartItem.title}
                                        </td>
                                        <td>{cartItem.price}</td>
                                        <td className='d-flex justify-content-center align-items-center'>
                                            <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleDecrement(cartItem.id)}>-</button>
                                            <input type="number" className="form-control text-center" value={cartItem?.quantity} min={1} style={{ width: 60 }} readOnly/>
                                            <button className="btn btn-outline-success btn-sm ms-2" onClick={() => dispatch(increment(cartItem.id))}>+</button>
                                        </td>
                                        <td>{(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeSingle(cartItem.id))}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h4>Total: ${cartTotalPrice}</h4>
                    <button className="btn btn-success">Checkout</button>
                </div>
            </> : <>
                <h2 className="mb-4">Shopping Cart</h2>
                <div className="alert alert-warning" role="alert">
                    Your cart is currently empty.
                </div>
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </>}

        </div>

    )
}
