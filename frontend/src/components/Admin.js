import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';


const Admin = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        if (image1) formData.append('image_1', image1);
        if (image2) formData.append('image_2', image2);
        if (image3) formData.append('image_3', image3);

        axios.post('/admin/add-product', formData)
            .then(response => {
                console.log('Product added successfully');
                navigate('/');  // Redirect to home page after successful submission
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };

    return (
        <div className="admin">
            <h1>Admin - Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Product Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="image1">Product Image 1:</label>
                    <input
                        type="file"
                        id="image1"
                        onChange={(e) => setImage1(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image2">Product Image 2 (optional):</label>
                    <input
                        type="file"
                        id="image2"
                        onChange={(e) => setImage2(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image3">Product Image 3 (optional):</label>
                    <input
                        type="file"
                        id="image3"
                        onChange={(e) => setImage3(e.target.files[0])}
                        accept="image/*"
                    />
                </div>
                
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
            <a href="/" className="back-link">Back to Main Page</a>
        </div>
    );
};

export default Admin;
