import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file for styling

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="logo.png" alt="Logo" />
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/admin">Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
