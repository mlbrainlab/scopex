import React, { useState } from 'react';
import Admin from './components/Admin';
import FormTemplate from './components/FormTemplate';

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

            <FormTemplate template={selectedTemplate} />
        </div>
    );
}

export default App;
