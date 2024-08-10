import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TemplateForm from './components/TemplateForm';

const templates = [
    {
      name: 'Biochemistry Markers',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Age', type: 'number', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Case No.', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Ref. By', type: 'text', required: false },
        { label: 'Alpha Glucosidase', type: 'text', required: false },
        { label: 'Fructose', type: 'text', required: false },
        { label: 'Zinc', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    },
    {
      name: 'Blood Test',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Age', type: 'number', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Case No.', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Ref. By', type: 'text', required: false },
        { label: 'Hemoglobin', type: 'text', required: false },
        { label: 'Red blood cells', type: 'text', required: false },
        { label: 'Hematocrit', type: 'text', required: false },
        { label: 'MCV', type: 'text', required: false },
        { label: 'MCH', type: 'text', required: false },
        { label: 'MCHC', type: 'text', required: false },
        { label: 'Platelets', type: 'text', required: false },
        { label: 'White blood cells', type: 'text', required: false },
        { label: 'Neutrophils', type: 'text', required: false },
        { label: 'Neut.Staaf', type: 'text', required: false },
        { label: 'Neut. Seg.', type: 'text', required: false },
        { label: 'Lymphocytes', type: 'text', required: false },
        { label: 'Monocytes', type: 'text', required: false },
        { label: 'Eosinophils', type: 'text', required: false },
        { label: 'Basophiles', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    },
    {
      name: 'Bone Marrow Examination',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Age', type: 'number', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Case No.', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Ref. By', type: 'text', required: false },
        { label: 'Site', type: 'text', required: false },
        { label: 'Cellularity', type: 'text', required: false },
        { label: 'Erythroblasts', type: 'text', required: false },
        { label: 'Granulopoiesis', type: 'text', required: false },
        { label: 'Lymphocytes', type: 'text', required: false },
        { label: 'Blast', type: 'text', required: false },
        { label: 'Promyelocyte', type: 'text', required: false },
        { label: 'Myelocytes', type: 'text', required: false },
        { label: 'Metamyelocytes', type: 'text', required: false },
        { label: 'Band', type: 'text', required: false },
        { label: 'Netrophils', type: 'text', required: false },
        { label: 'Eosinophils', type: 'text', required: false },
        { label: 'M / E Ratio', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    },
    {
      name: 'Culture Sensitivity',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Age', type: 'number', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Case No.', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Ref. By', type: 'text', required: false },
        { label: 'Type of Specimen', type: 'text', required: false },
        { label: 'Leucocytes', type: 'text', required: false },
        { label: 'RBCs', type: 'text', required: false },
        { label: 'Gram Stain', type: 'text', required: false },
        { label: 'Bacterial Shape', type: 'text', required: false },
        { label: 'Bacterial Arrangement', type: 'text', required: false },
        { label: 'Culture Result (MICRO-ORGANISM)', type: 'text', required: false },
        { label: 'Antibiogrammes', type: 'text', required: false },
        { label: 'Sensitivity', type: 'text', required: false },
        { label: 'Intermediate', type: 'text', required: false },
        { label: 'Resistant', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    },
    {
      name: 'Semen',
      fields: [
        { label: 'Patient Name', type: 'text', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Abstinence', type: 'text', required: false },
        { label: 'Collection', type: 'text', required: false },
        { label: 'Volume', type: 'text', required: false },
        { label: 'Color', type: 'text', required: false },
        { label: 'Oder', type: 'text', required: false },
        { label: 'PH', type: 'text', required: false },
        { label: 'Viscosity', type: 'text', required: false },
        { label: 'Liquefaction Time', type: 'text', required: false },
        { label: 'Liquefaction State', type: 'text', required: false },
        { label: 'Concentration', type: 'text', required: false },
        { label: 'Total Sperm Count', type: 'text', required: false },
        { label: 'Progressive Motility (PR)', type: 'text', required: false },
        { label: 'Total Motility (PR + NP)', type: 'text', required: false },
        { label: 'Morphology Normal', type: 'text', required: false },
        { label: 'Morphology Index', type: 'text', required: false },
        { label: 'Aggregation', type: 'text', required: false },
        { label: 'Agglutination', type: 'text', required: false },
        { label: 'WBC', type: 'text', required: false },
        { label: 'Immature Cell', type: 'text', required: false },
        { label: 'Round Cell', type: 'text', required: false },
        { label: 'Class A (fast & prog)', type: 'text', required: false },
        { label: 'Class B (slow & prog)', type: 'text', required: false },
        { label: 'Class C (non progressive)', type: 'text', required: false },
        { label: 'Class D (immotile)', type: 'text', required: false },
        { label: 'Vitality', type: 'text', required: false },
        { label: 'Dead', type: 'text', required: false },
        { label: 'Alive', type: 'text', required: false },
        { label: 'DNA Fragmentation Index', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    },
    {
      name: 'Stool Examination',
      fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Age', type: 'number', required: true },
        { label: 'Lab ID', type: 'text', required: true },
        { label: 'Case No.', type: 'text', required: true },
        { label: 'Date', type: 'date', required: true },
        { label: 'Ref. By', type: 'text', required: false },
        { label: 'Color', type: 'text', required: false },
        { label: 'Consistency', type: 'text', required: false },
        { label: 'Blood', type: 'text', required: false },
        { label: 'Mucus', type: 'text', required: false },
        { label: 'PH', type: 'text', required: false },
        { label: 'Red blood cells', type: 'text', required: false },
        { label: 'Pus Cells', type: 'text', required: false },
        { label: 'Cysts', type: 'text', required: false },
        { label: 'Crystals', type: 'text', required: false },
        { label: 'Trophozoites', type: 'text', required: false },
        { label: 'Ova', type: 'text', required: false },
        { label: 'Larva', type: 'text', required: false },
        { label: 'Blood (Occult)', type: 'text', required: false },
        { label: 'Others', type: 'text', required: false },
        { label: 'Comment', type: 'textarea', required: false }
      ]
    }
];  

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (e) => {
    const template = templates.find(t => t.name === e.target.value);
    setSelectedTemplate(template);
  };

  return (
    <div>
      <h1>Choose a Template</h1>
      <select onChange={handleSelect}>
        <option value="">Select Template</option>
        {templates.map((template, index) => (
          <option key={index} value={template.name}>{template.name}</option>
        ))}
      </select>

      {selectedTemplate && (
        <TemplateForm template={selectedTemplate} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
