import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        axios.get('/check_session')
            .then(response => {
                if (response.data.logged_in) {
                    setLoggedIn(true);
                    setIsAdmin(response.data.is_admin);
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });

        axios.get('/api/cart')
            .then(response => {
                setCartCount(response.data.length || 0);
            })
            .catch(error => {
                console.error('Error fetching cart count:', error);
            });
    }, []);

    const handleLogout = () => {
        axios.post('/logout')
            .then(() => {
                setLoggedIn(false);
                setIsAdmin(false);
                window.location.reload(); // Reload the page to update the header
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>My Shop</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        {loggedIn ? (
                            <>
                                <Link to="/cart">Cart ({cartCount})</Link>
                                {isAdmin && <Link to="/admin">Admin</Link>}
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin" element={loggedIn && isAdmin ? <Admin /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;