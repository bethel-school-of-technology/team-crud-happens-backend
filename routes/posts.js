import express from 'express';

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Its working!');
}); 

export default router;