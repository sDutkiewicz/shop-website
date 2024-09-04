import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './productDetail.css';


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

    const images = [product.image_url_1, product.image_url_2, product.image_url_3].filter(Boolean);

    return (
        <div className="product-detail">
            <div className="image-gallery">
                {images.map((image, index) => (
                    <img key={index} src={`/uploads/${image}`} alt={`${product.name} ${index + 1}`} className="product-image" />
                ))}
            </div>
            <h1>{product.name}</h1>
            <p className="product-price">{product.price} zł</p>
            <p className="product-description">{product.description}</p>
            <Link to="/" className="back-button">Back to Shop</Link>
        </div>
    );
};

export default ProductDetail;
