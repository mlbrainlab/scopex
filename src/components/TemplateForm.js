import React, { useEffect } from 'react';

function TemplateForm({ template, showOptionalFields, showRequiredFields, handleInputChange, formData }) {
    
    // Set today's date as the default value for the Date field
    useEffect(() => {
        if (!formData.Date) {
            handleInputChange({
                target: {
                    name: 'Date',
                    value: new Date().toISOString().split('T')[0] // Set to today's date
                }
            });
        }
    }, [formData, handleInputChange]);

    return (
        <div className="form-container">
            {/* Render required fields */}
            {showRequiredFields && template.requiredFields.map((field, index) => (
                <div className="form-group" key={index}>
                    <label htmlFor={field.label}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.label}
                        name={field.label}
                        value={formData[field.label] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                    />
                </div>
            ))}

            {showOptionalFields && template.optionalFields.map((field, index) => (
                <div className="form-group" key={index}>
                    <label htmlFor={field.label}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.label}
                        name={field.label}
                        value={formData[field.label] || ''}
                        onChange={handleInputChange}
                    />
                </div>
            ))}
        </div>
    );
}

export default TemplateForm;
