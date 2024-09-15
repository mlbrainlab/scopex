import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import TemplateForm from './components/TemplateForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';  // Import Footer

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} /> {/* Default route */}
                <Route path="/" element={<TemplateForm />} />
                <Route path="/admin" element={<Dashboard />} />
            </Routes>
            <Footer />  {/* Include Footer at the bottom */}
        </Router>
    );
}

export default App;
