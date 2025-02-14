import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/ProductSlice';

export default function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const products = useSelector((store) => store.ProductSlice.products);

    return (
        <div className="container card_section">
            <div className="row">
                {products?.map((item) => {
                    return (
                        <div className="col-md-3 mb-5" key={item.id}>
                            <ProductCard data={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
