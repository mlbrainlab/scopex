import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TemplateForm({ template }) {
    const [formData, setFormData] = useState({});

    // Prompt the user when they select a new template if the form is already filled
    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            const userConfirmed = window.confirm("There are already filled fields. Do you want to clear the content?");
            if (userConfirmed) {
                setFormData({ Date: new Date().toISOString().split('T')[0] });  // Reset form data, keeping the date
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                Date: new Date().toISOString().split('T')[0]
            }));
        }
    }, [template]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/form-submit', {
                templateName: template.name,
                formData
            });
            console.log('Form submitted:', response.data);
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    const mandatoryFields = template.fields.filter(field => field.required && !['Name', 'Age', 'Lab ID', 'Case No.', 'Date'].includes(field.label));
    const nonMandatoryFields = template.fields.filter(field => !field.required);

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>{template.name} Form</h3>
            
            <div className="section">
                <h4>Patient Information</h4>
                <div className="patient-info-grid">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., John Doe"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="e.g., 34"
                            value={formData.age || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lab-id">Lab ID</label>
                        <input
                            type="text"
                            id="lab-id"
                            name="lab-id"
                            placeholder="e.g., 12345"
                            value={formData["lab-id"] || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="case-no">Case No.</label>
                        <input
                            type="text"
                            id="case-no"
                            name="case-no"
                            placeholder="e.g., 6789"
                            value={formData["case-no"] || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="Date"
                            value={formData.Date || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="section">
                <h4>Mandatory Fields</h4>
                {mandatoryFields.map((field, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={field.label}>{field.label}</label>
                        <input
                            type={field.type}
                            id={field.label}
                            name={field.label}
                            placeholder={getPlaceholder(field.label)}
                            value={formData[field.label] || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
            </div>

            <div className="section">
                <h4>Optional Fields</h4>
                {nonMandatoryFields.map((field, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={field.label}>{field.label}</label>
                        <input
                            type={field.type}
                            id={field.label}
                            name={field.label}
                            placeholder={getPlaceholder(field.label)}
                            value={formData[field.label] || ''}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>

            <div className="form-group">
                <label htmlFor="file-upload">Upload File:</label>
                <input type="file" id="file-upload" onChange={handleChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

function getPlaceholder(label) {
    switch (label) {
        case 'Volume':
            return 'e.g., 1.5 - 6 ml';
        case 'PH':
            return 'e.g., 7.2 - 8';
        case 'Concentration':
            return 'e.g., > 15 Million/ml';
        case 'Total Sperm Count':
            return 'e.g., > 39 Million';
        case 'Progressive Motility (PR)':
            return 'e.g., > 32%';
        case 'Total Motility (PR + NP)':
            return 'e.g., > 40%';
        case 'Morphology Normal':
            return 'e.g., ≥ 4%';
        default:
            return `e.g., ${label}`;
    }
}

export default TemplateForm;
