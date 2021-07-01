import bodyParser from 'body-parser';
import express from 'express';
import { getPosts, getPost, createPost, updatePost } from '../controllers/posts.js';
import cors from 'cors';
import multer from 'multer';
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// const port = process.env.API_PORT || 8080;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.send('Welcome to this file upload API :)'));

// app.listen(port, () =>
//     console.log(`File uploader API listening on port ${port}`));
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