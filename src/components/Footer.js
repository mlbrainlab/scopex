import React from 'react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer className="footer">
            <p>&copy; {currentYear} Scopex. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
