import express from 'express';

import { getPosts, getPost, createPost, updatePost } from '../controllers/postTreatment.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/', getPost);
router.patch('/', updatePost);



export default router;