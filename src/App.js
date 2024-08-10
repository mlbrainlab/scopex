import React, { useState } from 'react';
import Admin from './components/Admin';
import TemplateForm from './components/TemplateForm';

function App() {
    const [selectedTemplate, setSelectedTemplate] = useState('stool-examination');

    const handleTemplateChange = (e) => {
        setSelectedTemplate(e.target.value);
    };

    return (
        <div className="App">
            <h1>Scopex Lab App</h1>
            <select onChange={handleTemplateChange} value={selectedTemplate}>
                <option value="stool-examination">Stool Examination Report</option>
                {/* Add more options here */}
            </select>

            <TemplateForm template={selectedTemplate} />
        </div>
    );
}

export default App;
