import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from the backend
        axios.get('/api/cart')
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        // Update quantity in state
        setCartItems(cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));

        // Send update to backend
        axios.post('/api/cart/update', { productId, quantity: newQuantity })
            .catch(error => {
                console.error('Error updating cart:', error);
            });
    };

    return (
        <div className="cart">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image_url} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2 className="cart-item-name">{item.name}</h2>
                                <p className="cart-item-price">{item.price} zł</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    className="cart-item-quantity"
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
