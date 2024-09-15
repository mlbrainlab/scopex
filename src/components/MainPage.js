import React, { useState, useEffect } from 'react';
import TemplateForm from './TemplateForm';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './MainPage.css'; // Include custom styles

// Assuming your Vercel app's base URL is stored in an environment variable
const apiBaseUrl = process.env.REACT_APP_API_URL;

const dummyLabOrders = [
    {
        patientName: 'John Doe',
        labID: '12345',
        caseID: '98765',
        labTest: 'Blood Test'
    },
    {
        patientName: 'Jane Smith',
        labID: '67890',
        caseID: '65432',
        labTest: 'Semen Examination'
    },
    {
        patientName: 'John Doe',
        labID: '12345',
        caseID: '96533',
        labTest: 'Biochemistry Markers'
    },
    {
        patientName: 'Kyle Walker',
        labID: '67890',
        caseID: '34221',
        labTest: 'Bone Marrow Examination'
    },
    {
        patientName: 'Truffle Games',
        labID: '12345',
        caseID: '42355',
        labTest: 'Culture Sensitivity'
    },
    {
        patientName: 'Arnold Vinod',
        labID: '67890',
        caseID: '11433',
        labTest: 'Stool Examination'
    },
];

const templates = {
    'Biochemistry Markers': {
        color: '#3498db',
        requiredFields: [
            { label: 'Alpha Glucosidase', type: 'text' },
            { label: 'Fructose', type: 'text' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Zinc', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    'Blood Test': {
        color: '#e74c3c', // Red        
        requiredFields: [
            { label: 'Hemoglobin', type: 'text' },
            { label: 'Red blood cells', type: 'text' },
            { label: 'Hematocrit', type: 'text' },
            { label: 'MCV', type: 'text' },
            { label: 'MCH', type: 'text' },
            { label: 'MCHC', type: 'text' }
        ],
        optionalFields: [
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
    'Bone Marrow Examination': {
        color: '#2ecc71', // Green        
        requiredFields: [
            { label: 'Site', type: 'text' },
            { label: 'Cellularity', type: 'text' },
            { label: 'Erythroblasts', type: 'text' },
            { label: 'Granulopoiesis', type: 'text' },
            { label: 'Lymphocytes', type: 'text' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
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
    'Culture Sensitivity': {
        color: '#f39c12', // Orange        
        requiredFields: [
            { label: 'Type of Specimen', type: 'text' },
            { label: 'Leucocytes', type: 'text' },
            { label: 'RBCs', type: 'text' },
            { label: 'Gram Stain', type: 'text' },
            { label: 'Bacterial Shape', type: 'text' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
            { label: 'Bacterial Arrangement', type: 'text' },
            { label: 'Culture Result (MICRO-ORGANISM)', type: 'text' },
            { label: 'Antibiogrammes', type: 'text' },
            { label: 'Sensitivity', type: 'text' },
            { label: 'Intermediate', type: 'text' },
            { label: 'Resistant', type: 'text' },
            { label: 'Comment', type: 'textarea' }
        ]
    },
    'Semen Examination': {
        color: '#9b59b6', // Purple        
        requiredFields: [
            { label: 'Abstinence', type: 'text' },
            { label: 'Collection', type: 'text' },
            { label: 'Volume', type: 'text' },
            { label: 'Color', type: 'text' },
            { label: 'Oder', type: 'text' },
            { label: 'PH', type: 'text' }
        ],
        optionalFields: [
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
    'Stool Examination': {
        color: '#34495e', // Dark Blue        
        requiredFields: [
            { label: 'Color', type: 'text' },
            { label: 'Consistency', type: 'text' },
            { label: 'Blood', type: 'text' },
            { label: 'Mucus', type: 'text' },
            { label: 'PH', type: 'text' }
        ],
        optionalFields: [
            { label: 'Ref. By', type: 'text' },
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
};

// Toast function to show the notification
function Toast({ message, onClose }) {
    return (
        <div className="toast-overlay">
            <div className="toast-content">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

function MainPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [viewOptionalFields, setViewOptionalFields] = useState(false);
  const [viewRequiredFields, setViewRequiredFields] = useState(true);
  const [formData, setFormData] = useState({});
  const [fileName, setFileName] = useState("No File Chosen");
  const [showToast, setShowToast] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFileChange = (e) => {
      setFileName(e.target.files[0] ? e.target.files[0].name : "No File Chosen");
  };

  const handleButtonClick = (template) => {
      setSelectedTemplate(template);
      setViewOptionalFields(false);
      setViewRequiredFields(true); // Start with the required fields
      setFormData({}); // Reset form data when a new template is selected
      resetFileInput(); // Reset file input
  };

  const handleViewOptionalFields = () => {
      setViewOptionalFields(true); // Show optional fields
      setViewRequiredFields(false);
  };

  const handleGoBack = () => {
      setViewOptionalFields(false);
      setViewRequiredFields(true); // Go back to required fields
  };

  const handleClosePopup = () => {
      setSelectedTemplate(null);
      setViewOptionalFields(false); // Reset everything when closing the popup
  };

  const handleInputChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  const resetFileInput = () => {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
        fileInput.value = ""; // Clear the file input
    }
    setFileName("No File Chosen"); // Reset the file name state
  };
  
// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedFilePath = null;
    let toastMessage = "Form submitted successfully"; // Default message

    // Validation: Ensure all required fields are filled
    const missingFields = selectedTemplate.requiredFields.filter(field => !formData[field.label]);
    if (missingFields.length > 0) {
        toastMessage = `Please fill in the required fields: ${missingFields.map(field => field.label).join(', ')}`;
        setToastMessage(toastMessage);
        setShowWarning(true);
        return;
    }

    // Check if a file is selected and upload it
    if (fileName !== "No File Chosen") {
        const formData = new FormData();
        const fileInput = document.getElementById('file-upload');
        const selectedFile = fileInput.files[0];

        // Ensure a file is selected
        if (selectedFile) {
            formData.append('file', selectedFile);

            try {
                const uploadResponse = await axios.post(`${apiBaseUrl}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                uploadedFilePath = uploadResponse.data.filePath;
                toastMessage = "File uploaded and Form submitted successfully"; // Update message if file is uploaded
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file');
                return; // Stop submission if the file upload fails
            }
        } else {
            console.error('No file selected');
            alert('Please select a file to upload');
            return; // Stop submission if no file is selected
        }
    }

    // Proceed with submitting form data
    try {
        const response = await axios.post(`${apiBaseUrl}/api/form-submit`, {
            templateName: selectedTemplate.name,
            formData: {
                ...formData,
                filePath: uploadedFilePath // Add the file path to the form data
            }
        });

        // Show the toast message
        setToastMessage(toastMessage);
        setShowToast(true);

        // Clear form data and close popup after submission
        handleClosePopup();

  // useEffect Hook to handle "Esc" & Mouse-click out of popup key to close the popup
  useEffect(() => {
      const handleEscKey = (event) => {
          if (event.key === 'Escape') {
              handleClosePopup();
          }
      };
   
      const handleClickOutside = (event) => {
          const popupContent = document.querySelector('.popup-content');
          if (popupContent && !popupContent.contains(event.target)) {
              handleClosePopup();
          }
      };
   
      window.addEventListener('keydown', handleEscKey);
      window.addEventListener('mousedown', handleClickOutside);
   
      return () => {
          window.removeEventListener('keydown', handleEscKey);
          window.removeEventListener('mousedown', handleClickOutside);
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
              <div className={`popup-overlay ${showToast ? 'dimmed-popup' : ''}`}>
                  <div className="popup-content">
                      <button className="close-popup" onClick={handleClosePopup}>×</button>
                      {/* Conditional Rendering based on the current view */}
                      <form onSubmit={handleSubmit}>
                          {!viewOptionalFields ? (
                              <div>
                                  <h2>{selectedTemplate.name} - Required Fields</h2>
                                  <TemplateForm
                                      template={selectedTemplate}
                                      showOptionalFields={false}
                                      showRequiredFields={true}
                                      handleInputChange={handleInputChange}
                                      formData={formData}
                                  />
                                  <button type="button" onClick={handleViewOptionalFields} className="optional-btn">
                                      Add Optional Fields
                                  </button>
                              </div>
                          ) : (
                              <div>
                                  <button type="button" className="back-btn" onClick={handleGoBack}>
                                      ←
                                  </button>
                                  <h2>{selectedTemplate.name} - Optional Fields</h2>
                                  <TemplateForm
                                      template={selectedTemplate}
                                      showOptionalFields={true}
                                      showRequiredFields={false}
                                      handleInputChange={handleInputChange}
                                      formData={formData}
                                  />
                              </div>
                          )}
                          {/* Custom File Upload */}
                          <div className="form-group full-width-upload">
                              <label htmlFor="file-upload" className="upload-btn">
                                  Select Files to Upload
                              </label>
                              <input
                                  type="file"
                                  id="file-upload"
                                  name="file-upload"
                                  className="file-input"
                                  onChange={handleFileChange}
                              />
                              <span className="file-name">{fileName}</span>
                          </div>
                          {/* Submit Button */}
                          <div className="form-actions">
                              <button type="submit" className="submit-btn">Submit</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
    
          {/* Render Toast Notification */}
          {showToast && (
              <div className="dialogue-overlay">
                  <div className="dialogue-content">
                      <p>{toastMessage}</p>
                      <button onClick={() => {
                          setShowToast(false);
                          handleClosePopup(); // Close the popup when OK is pressed
                      }}>OK</button>
                  </div>
              </div>
          )}
          {/* Render Warning Notification */}
          {showWarning && (
              <div className="dialogue-overlay">
                  <div className="dialogue-content">
                      <p>{toastMessage}</p>
                      <button onClick={() => {
                          setShowWarning(false);
                      }}>OK</button>
                  </div>
              </div>
          )}

      </div>
  );
}

export default MainPage;