import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import { getPosts, getPost, createPost, updatePost } from '../controllers/posts.js';
import { Storage } from '@google-cloud/storage';
import Cors from 'cors';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();
router.get('/', getPosts);
router.post('/', createPost);
router.get('/', getPost);
router.patch('/', updatePost);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.API_PORT || 8080;

app.get('/', (req, res) =>
    res.send('File upload API ready for use'));
app.listen(port, () =>
    console.log(`File uploader API listening on port ${port}`));
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});
app.post('/', uploader.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).send('Error, could not upload file');
            return;
        }
        const blob = bucket.file(req.file.originalname);
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });
        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

            res.status(200).send({ fileName: req.file.originalname, fileLocation: publicUrl });
        });
        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
    }
});

export default router;