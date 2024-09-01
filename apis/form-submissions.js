import mongoose from 'mongoose';
import FormSubmission from '../models/FormSubmission';

const MONGO_URI = process.env.MONGO_URI;

if (!mongoose.connection.readyState) {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
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

        try {
            const submissions = await FormSubmission.find(query);
            res.status(200).json(submissions);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving form submissions', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
