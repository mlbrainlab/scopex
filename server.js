const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FormSubmission = require('./models/FormSubmission');

const app = express();

app.use(express.json());  // To parse JSON bodies
app.use(cors());  // To handle cross-origin requests

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/scopex')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// API endpoint for form submissions
app.post('/api/form-submit', async (req, res) => {
    try {
        const { templateName, formData } = req.body;
        const submission = new FormSubmission({ templateName, formData });
        await submission.save();
        res.status(201).send({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send({ message: 'Error saving form data', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
