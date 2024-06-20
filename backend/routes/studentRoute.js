import express from 'express';
import { registration, students, updateMarks } from '../controller/studentController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create the directory if it does not exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

router.get('/', students);
router.post('/registration', upload.single('picUrl'), registration);
router.put('/result/:id', updateMarks);

export default router;
