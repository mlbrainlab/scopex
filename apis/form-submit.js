const mongoose = require('mongoose');
const FormSubmission = require('../models/FormSubmission');

// Ensure MongoDB is connected
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || (!MONGO_URI.startsWith('mongodb://') && !MONGO_URI.startsWith('mongodb+srv://'))) {
    console.error('Invalid MongoDB connection string:', MONGO_URI);
    throw new Error('Invalid MongoDB connection string');
}

if (!mongoose.connection.readyState) {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected successfully'))
      .catch(err => console.error('Error connecting to MongoDB:', err));
}

module.exports = async function handler(req, res) {
    if (req.method === 'POST') {
        const { templateName, formData } = req.body;
        try {
            const submission = new FormSubmission({ templateName, formData });
            await submission.save();
            res.status(201).json({ message: 'Form data saved successfully' });
        } catch (error) {
            console.error('Error saving form data:', error);
            res.status(500).json({ message: 'Error saving form data', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
