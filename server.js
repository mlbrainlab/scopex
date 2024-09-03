const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const FormSubmission = require('./models/FormSubmission');

// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
require('dotenv').config({ path: envFile });

const app = express();

app.use(express.json());
// Dynamically set the CORS origin based on the environment
const allowedOrigins = [process.env.REACT_APP_API_URL, 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Ensure the uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up storage engine for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Specify the folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid conflicts
    }
});

// Initialize multer for handling file uploads
const upload = multer({ storage: storage });

// In production, load the APIs from the `apis/` folder
if (process.env.NODE_ENV === 'production') {
    app.use('/api/upload', require('./apis/upload'));
    app.use('/api/form-submit', require('./apis/form-submit'));
    app.use('/api/form-submissions', require('./apis/form-submissions'));
    app.use('/api/test', require('./apis/test'));
} else {
    // Serve the existing API routes as defined directly in server.js
    app.get('/api/test', (req, res) => {
        res.status(200).send('API is working!');
    });

    // API endpoint for handling file uploads
    app.post('/api/upload', upload.single('file'), (req, res) => {
        try {
            res.status(200).send({ message: 'File uploaded successfully', filePath: req.file.path });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).send({ message: 'Error uploading file', error });
        }
    });

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

    // API endpoint to retrieve all form submissions with optional filters
    app.get('/api/form-submissions', async (req, res) => {
        try {
            const { templateName, dateFrom, dateTo } = req.query;
            const query = {};

            if (templateName) {
                query.templateName = templateName;
            }
            if (dateFrom || dateTo) {
                query['formData.Date'] = {};
                if (dateFrom) query['formData.Date'].$gte = new Date(dateFrom);
                if (dateTo) query['formData.Date'].$lte = new Date(dateTo);
            }

            const submissions = await FormSubmission.find(query);
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error retrieving form submissions:', error);
            res.status(500).send({ message: 'Error retrieving form submissions', error });
        }
    });
}

// Serve static files from the React app (only in production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Catch-all route to serve React's index.html for any non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4600;
if (process.env.NODE_ENV === 'production') {
    // On Vercel or other cloud platforms, the PORT is automatically managed.
    app.listen();
} else {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
