import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="product-grid">
            {products.map(product => (
                <div className="product-card" key={product.id}>
                    {/* Display only the first image */}
                    {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="product-image" />
                    )}
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">{product.price} zł</p>
                    <Link to={`/product/${product.id}`} className="product-details-button">View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
