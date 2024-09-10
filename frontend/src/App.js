import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Admin from './components/Admin';
import axios from 'axios';
import './style.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        axios.get('/check_session')
            .then(response => {
                if (response.data.logged_in) {
                    setLoggedIn(true);
                    setUserName(response.data.user_name);
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const handleLogout = () => {
        axios.post('/logout')
            .then(response => {
                setLoggedIn(false);
                setUserName('');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <Router>
            <div>
                <nav>
                    <div className="nav-left">
                        <Link to="/">Home</Link>
                        {!loggedIn && <Link to="/register">Register</Link>}
                        {!loggedIn && <Link to="/login">Login</Link>}
                    </div>
                    {loggedIn && (
                        <div className="nav-right">
                            <span>Welcome, {userName}!</span>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </nav>
                
                {showMessage && (
                    <div className="header-message">
                        {loggedIn ? `Successfully logged in as ${userName}` : "You have been logged out."}
                    </div>
                )}

                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/register" element={!loggedIn ? <Register onLogin={handleLogin} /> : <div>You are already registered and logged in.</div>} />
                    <Route path="/login" element={!loggedIn ? <Login onLogin={handleLogin} /> : <div>You are already logged in.</div>} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
