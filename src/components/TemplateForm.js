import React from 'react';

function TemplateForm({ template, showOptionalFields }) {
    return (
        <form className="form-container">
            {/* Render required fields */}
            {template.requiredFields.map((field, index) => (
                <div className="form-group" key={index}>
                    <label htmlFor={field.label}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.label}
                        name={field.label}
                        required={field.required}
                    />
                </div>
            ))}

            {/* Conditionally render optional fields */}
            {showOptionalFields && template.optionalFields.map((field, index) => (
                <div className="form-group" key={index}>
                    <label htmlFor={field.label}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.label}
                        name={field.label}
                    />
                </div>
            ))}
        </form>
    );
}

export default TemplateForm;
