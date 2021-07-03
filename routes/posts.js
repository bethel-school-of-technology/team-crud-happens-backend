import bodyParser from 'body-parser';
import express from 'express';
import { getPosts, getPost, createPost, updatePost } from '../controllers/posts.js';
import cors from 'cors';
import multer from 'multer';
const app = express();

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});


const router = express.Router();
router.get('/', getPosts);
router.post('/', uploader.single('image'), createPost);
router.get('/', getPost);
router.patch('/', updatePost);


export default router