import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Admin from './components/Admin';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        axios.get('/check_session')
            .then(response => {
                if (response.data.logged_in) {
                    setLoggedIn(true);
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });

        axios.get('/api/cart')
            .then(response => {
                setCartCount(response.data.cart_items.length);
            })
            .catch(error => {
                console.error('Error fetching cart count:', error);
            });
    }, []);

    const handleLogout = () => {
        axios.post('/logout')
            .then(() => {
                setLoggedIn(false);
                setCartCount(0);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <div className="nav-left">
                            <h1>My Shop</h1>
                            <Link to="/">Home</Link>
                        </div>
                        <div className="nav-right">
                            <Link to="/cart" className="cart-link">
                                <img src="/path/to/cart-icon.png" alt="Cart" className="cart-icon" />
                                <span className="cart-count">{cartCount}</span>
                            </Link>
                            {loggedIn ? (
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            ) : (
                                <>
                                    <Link to="/register">Register</Link>
                                    <Link to="/login">Login</Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
