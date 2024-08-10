const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
    templateName: String,
    formData: Object,  // Use an object to store the form data
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
