const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set up file storage

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.post('/submit-form', upload.array('images'), (req, res) => {
    const formData = req.body;
    const images = req.files;
    // Save formData and images to the database (e.g., MongoDB)
    res.send('Form submitted successfully!');
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
