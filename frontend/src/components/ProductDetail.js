import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <img src={`/uploads/${product.image_url}`} alt={product.name} className="product-image" />
            <h1>{product.name}</h1>
            <p className="product-price">{product.price} zł</p>
            <p>Some description or additional details about the product here.</p>
            <Link to="/" className="back-button">Back to Shop</Link>
        </div>
    );
};

export default ProductDetail;
