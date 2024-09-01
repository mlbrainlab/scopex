const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = '/tmp/uploads';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
});

export default function handler(req, res) {
    if (req.method === 'POST') {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err });
            }
            res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
