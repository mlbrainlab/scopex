const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
    templateName: { type: String, required: true },
    formData: { type: Object, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
