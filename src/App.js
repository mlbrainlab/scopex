import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';  // Import Footer

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} /> {/* Default route */}
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <Footer />  {/* Include Footer at the bottom */}
        </Router>
    );
}

export default App;
