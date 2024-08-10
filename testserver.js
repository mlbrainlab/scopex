const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scopex')
    .then(() => {
        console.log('MongoDB connected successfully');
        mongoose.connection.close();  // Close the connection after testing
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
