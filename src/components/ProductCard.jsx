import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { addToCart, increment, decrement, removeSingle } from '../redux/slices/CartSlice';

export default function ProductCard(props) {
    const [cartItem, setCartItem] = useState(null);

    const dispatch = useDispatch();
    const data = props.data;
    const cartData = useSelector((store) => store.cartSlice.cartItems);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleIncrement = (id) => {
        dispatch(increment(id));
    };

    const handleDecrement = (id) => {
        if (cartItem && cartItem.quantity === 1) {
            dispatch(removeSingle(id));
        } else {
            dispatch(decrement(id));
        }
    };

    useEffect(() => {
        const currentProduct = cartData?.find((item) => item.id === data?.id);
        setCartItem(currentProduct || null);
    }, [cartData, data?.id]);

    return (
        <div className="card product-card">
            <LazyLoadImage 
                src={data?.image} 
                alt="Loading..." 
                className="card-img-top px-5 py-3"
                effect="blur" 
                // placeholderSrc="Loading..."
            />
            <div className="card-body">
                <h5 className="card-title">{data?.title}</h5>
                <p className="card-text text-secondary"><strong>Category:</strong> {data?.category}</p>
                <p className="card-text text-muted clamp_text">{data?.description}</p>
                <p className="card-text fw-bold text-primary">Price: ${data?.price}</p>

                {!cartItem ? (
                    <button className='btn btn-success' onClick={() => handleAddToCart(data)}>Add to cart</button>
                ) : (
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleDecrement(cartItem.id)}>-</button>
                        <input
                            type="number"
                            className="form-control text-center"
                            value={cartItem.quantity}
                            readOnly
                            style={{ width: 60 }}
                        />
                        <button className="btn btn-outline-success btn-sm ms-2" onClick={() => handleIncrement(cartItem.id)}>+</button>
                    </div>
                )}
            </div>
        </div>
    );
}
