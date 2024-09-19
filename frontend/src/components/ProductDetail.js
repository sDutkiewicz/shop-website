import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null); // State to track the main image

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => {
                const productData = response.data;
                setProduct(productData);
                setMainImage(productData.image_url_1); // Set the first image as the default main image
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    const handleAddToCart = () => {
        axios.post('/api/cart/add', { product_id: product.id, quantity })
            .then(response => {
                alert('Product added to cart');
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    // Image gallery, excluding any null values
    const images = [product.image_url_1, product.image_url_2, product.image_url_3].filter(Boolean);

    return (
        <div className="product-detail">
            <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-price">{product.price} zł</p>
            </div>

            <div className="product-content">
                {/* Main Image */}
                <div className="main-image-container">
                    {mainImage && <img src={mainImage} alt="Main product" className="main-product-image" />}
                </div>

                {/* Thumbnails */}
                <div className="thumbnails-container">
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="thumbnail-image" 
                            onClick={() => setMainImage(image)} // Set clicked image as the main image
                        />
                    ))}
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <p className="product-description">{product.description}</p>
                    <div className="product-actions">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="quantity-input"
                        />
                        <button onClick={handleAddToCart} className="buy-button">Add to Cart</button>
                    </div>
                </div>
            </div>

            <Link to="/" className="back-button">Back to Shop</Link>
        </div>
    );
};

export default ProductDetail;
