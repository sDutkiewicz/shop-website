import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

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
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="price">Product Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    required
                />
                <br />
                <label htmlFor="image">Product Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    required
                />
                <br />
                <button type="submit">Add Product</button>
            </form>
            <a href="/">Back to Main Page</a>
        </div>
    );
};

export default Admin;
