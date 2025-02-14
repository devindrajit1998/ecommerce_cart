import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../redux/slices/CartSlice';

const HomePage = lazy(() => import('./HomePage'));
const CartPage = lazy(() => import('./CartPage'));

export default function Layout() {
    const dispatch = useDispatch();
    const loadingState = useSelector((store) => store.ProductSlice.loading);
    const getCartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    useEffect(() => {
        dispatch(updateCart(getCartFromLocalStorage));
    }, []);
    return (
        <>
            {loadingState && <Loader />}
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/cart' element={<CartPage />} />
                </Routes>
            </Suspense>
        </>
    );
}
