import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState({ field: '', order: '' });

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'name-asc') {
            setSortCriteria({ field: 'name', order: 'asc' });
        } else if (value === 'name-desc') {
            setSortCriteria({ field: 'name', order: 'desc' });
        } else if (value === 'price-asc') {
            setSortCriteria({ field: 'price', order: 'asc' });
        } else if (value === 'price-desc') {
            setSortCriteria({ field: 'price', order: 'desc' });
        } else {
            setSortCriteria({ field: '', order: '' });
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortCriteria.field === 'name') {
            if (sortCriteria.order === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        } else if (sortCriteria.field === 'price') {
            if (sortCriteria.order === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        } else {
            return 0;
        }
    });

    return (
        <div className="main-page">
            <header className="header">
                <h1>Welcome to Our Shop</h1>
            </header>
            <div className="sort-options">
                <select onChange={handleSortChange} className="sort-select">
                    <option value="">Sort by</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div className="product-list">
                <div className="product-grid">
                    {sortedProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            {product.image_url && (
                                <img src={product.image_url} alt={product.name} className="product-image" />
                            )}
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{product.price} zł</p>
                            <Link to={`/product/${product.id}`} className="product-details-button">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">
                <p>© 2024 Shop Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProductList;
