import React, { useState } from 'react';

function FormTemplate({ template }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission, possibly send to backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{template} Form</h3>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} />
            </div>
            {/* Add more fields dynamically based on the template */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default FormTemplate;
