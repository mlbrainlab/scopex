import React, { useState, useEffect } from 'react';
import TemplateForm from './TemplateForm';
import './MainPage.css'; // Include custom styles

const templates = [
    {
        name: 'Biochemistry Markers',
        color: '#3498db',
        requiredFields: [
            { label: 'Name', type: 'text' },
            { label: 'Age', type: 'number' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Case No.', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Alpha Glucosidase', type: 'text' },
            { label: 'Fructose', type: 'text' },
            { label: 'Zinc', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    {
        name: 'Blood Test',
        color: '#e74c3c', // Red        
        requiredFields: [
            { label: 'Name', type: 'text' },
            { label: 'Age', type: 'number' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Case No.', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Hemoglobin', type: 'text' },
            { label: 'Red blood cells', type: 'text' },
            { label: 'Hematocrit', type: 'text' },
            { label: 'MCV', type: 'text' },
            { label: 'MCH', type: 'text' },
            { label: 'MCHC', type: 'text' },
            { label: 'Platelets', type: 'text' },
            { label: 'White blood cells', type: 'text' },
            { label: 'Neutrophils', type: 'text' },
            { label: 'Neut.Staaf', type: 'text' },
            { label: 'Neut. Seg.', type: 'text' },
            { label: 'Lymphocytes', type: 'text' },
            { label: 'Monocytes', type: 'text' },
            { label: 'Eosinophils', type: 'text' },
            { label: 'Basophiles', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    {
        name: 'Bone Marrow Examination',
        color: '#2ecc71', // Green        
        requiredFields: [
            { label: 'Name', type: 'text' },
            { label: 'Age', type: 'number' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Case No.', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Site', type: 'text' },
            { label: 'Cellularity', type: 'text' },
            { label: 'Erythroblasts', type: 'text' },
            { label: 'Granulopoiesis', type: 'text' },
            { label: 'Lymphocytes', type: 'text' },
            { label: 'Blast', type: 'text' },
            { label: 'Promyelocyte', type: 'text' },
            { label: 'Myelocytes', type: 'text' },
            { label: 'Metamyelocytes', type: 'text' },
            { label: 'Band', type: 'text' },
            { label: 'Netrophils', type: 'text' },
            { label: 'Eosinophils', type: 'text' },
            { label: 'M / E Ratio', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    {
        name: 'Culture Sensitivity',
        color: '#f39c12', // Orange        
        requiredFields: [
            { label: 'Name', type: 'text' },
            { label: 'Age', type: 'number' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Case No.', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Type of Specimen', type: 'text' },
            { label: 'Leucocytes', type: 'text' },
            { label: 'RBCs', type: 'text' },
            { label: 'Gram Stain', type: 'text' },
            { label: 'Bacterial Shape', type: 'text' },
            { label: 'Bacterial Arrangement', type: 'text' },
            { label: 'Culture Result (MICRO-ORGANISM)', type: 'text' },
            { label: 'Antibiogrammes', type: 'text' },
            { label: 'Sensitivity', type: 'text' },
            { label: 'Intermediate', type: 'text' },
            { label: 'Resistant', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    {
        name: 'Semen',
        color: '#9b59b6', // Purple        
        requiredFields: [
            { label: 'Patient Name', type: 'text' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Abstinence', type: 'text' },
            { label: 'Collection', type: 'text' },
            { label: 'Volume', type: 'text' },
            { label: 'Color', type: 'text' },
            { label: 'Oder', type: 'text' },
            { label: 'PH', type: 'text' },
            { label: 'Viscosity', type: 'text' },
            { label: 'Liquefaction Time', type: 'text' },
            { label: 'Liquefaction State', type: 'text' },
            { label: 'Concentration', type: 'text' },
            { label: 'Total Sperm Count', type: 'text' },
            { label: 'Progressive Motility (PR)', type: 'text' },
            { label: 'Total Motility (PR + NP)', type: 'text' },
            { label: 'Morphology Normal', type: 'text' },
            { label: 'Morphology Index', type: 'text' },
            { label: 'Aggregation', type: 'text' },
            { label: 'Agglutination', type: 'text' },
            { label: 'WBC', type: 'text' },
            { label: 'Immature Cell', type: 'text' },
            { label: 'Round Cell', type: 'text' },
            { label: 'Class A (fast & prog)', type: 'text' },
            { label: 'Class B (slow & prog)', type: 'text' },
            { label: 'Class C (non progressive)', type: 'text' },
            { label: 'Class D (immotile)', type: 'text' },
            { label: 'Vitality', type: 'text' },
            { label: 'Dead', type: 'text' },
            { label: 'Alive', type: 'text' },
            { label: 'DNA Fragmentation Index', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    {
        name: 'Stool Examination',
        color: '#34495e', // Dark Blue        
        requiredFields: [
            { label: 'Name', type: 'text' },
            { label: 'Age', type: 'number' },
            { label: 'Lab ID', type: 'text' },
            { label: 'Case No.', type: 'text' },
            { label: 'Date', type: 'date' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Color', type: 'text' },
            { label: 'Consistency', type: 'text' },
            { label: 'Blood', type: 'text' },
            { label: 'Mucus', type: 'text' },
            { label: 'PH', type: 'text' },
            { label: 'Red blood cells', type: 'text' },
            { label: 'Pus Cells', type: 'text' },
            { label: 'Cysts', type: 'text' },
            { label: 'Crystals', type: 'text' },
            { label: 'Trophozoites', type: 'text' },
            { label: 'Ova', type: 'text' },
            { label: 'Larva', type: 'text' },
            { label: 'Blood (Occult)', type: 'text' },
            { label: 'Others', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    }
];

function MainPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const handleButtonClick = (template) => {
      setSelectedTemplate(template);
      setShowOptionalFields(false); // Reset optional fields when selecting a new template
  };

  const handleAddOptionalFields = () => {
      setShowOptionalFields(true);
  };

  const handleClosePopup = () => {
      setSelectedTemplate(null);
      setShowOptionalFields(false); // Reset optional fields when closing the popup
  };

  // useEffect Hook to handle "Esc" key to close the popup
  useEffect(() => {
      const handleEscKey = (event) => {
          if (event.key === 'Escape') {
              handleClosePopup();
          }
      };

      window.addEventListener('keydown', handleEscKey);

      // Cleanup the event listener when the component is unmounted
      return () => {
          window.removeEventListener('keydown', handleEscKey);
      };
  }, []);

  return (
      <div className="main-container">
          <h1>ScopEx Lab Reporting</h1>
          <div className="button-container">
              {templates.map((template, index) => (
                  <button
                      key={index}
                      className="template-button"
                      onClick={() => handleButtonClick(template)}
                      style={{ backgroundColor: template.color }}
                  >
                      {template.name}
                  </button>
              ))}
          </div>

          {selectedTemplate && (
          <div className="popup-overlay">
              <div className="popup-content">
                  <button className="close-popup" onClick={handleClosePopup}>×</button>
                  <h2>{selectedTemplate.name}</h2>

                  {/* Form Section */}
                  <TemplateForm template={selectedTemplate} showOptionalFields={showOptionalFields} />

                  {/* Upload Button Row */}
                  <div className="form-group full-width-upload">
                      <label htmlFor="file-upload">Upload File:</label>
                      <input type="file" id="file-upload" name="file-upload" className="upload-btn" />
                  </div>

                  {/* Optional Fields and Submit Buttons */}
                  <div className="form-actions">
                      {!showOptionalFields && (
                          <button onClick={handleAddOptionalFields} className="optional-btn">Add Optional Fields</button>
                      )}
                      <button type="submit" className="submit-btn">Submit</button>
                  </div>
              </div>
          </div>
      )}
      </div>
  );
}

export default MainPage;