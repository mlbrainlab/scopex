const mongoose = require('mongoose');
const FormSubmission = require('../models/FormSubmission'); // Adjust the import based on your structure

// Ensure MongoDB is connected
const MONGO_URI = process.env.MONGO_URI;

if (!mongoose.connection.readyState) {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = async function handler(req, res) {
    if (req.method === 'POST') {
        const { templateName, formData } = req.body;
        try {
            const submission = new FormSubmission({ templateName, formData });
            await submission.save();
            res.status(201).json({ message: 'Form data saved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving form data', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
