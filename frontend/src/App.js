import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Admin from './components/Admin';
import axios from 'axios';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

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

    const handleLogout = () => {
        axios.post('/logout')
            .then(response => {
                setLoggedIn(false);
                setUserName('');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    {!loggedIn && <Link to="/register">Register</Link>}
                    {!loggedIn && <Link to="/login">Login</Link>}
                    {loggedIn && <button onClick={handleLogout}>Logout</button>}
                    {loggedIn && <span>You are logged in as {userName}</span>}
                </nav>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/register" element={!loggedIn ? <Register /> : <div>You are already registered and logged in.</div>} />
                    <Route path="/login" element={!loggedIn ? <Login /> : <div>You are already logged in.</div>} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
