import express from 'express';
import mongoose from 'mongoose';

import PostTreatment from '../models/treatments.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postTreatment = await PostTreatment.find();

        res.status(200).json(postTreatment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { post } = req.body;

    try {
        const Post = await PostTreatment.find(post);

        res.status(200).json(Post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, name } = req.body;

    const newPostTreatment = new PostTreatment({ title, name, message })

    try {
        await newPostTreatment.save();

        res.status(201).json(newPostTreatment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const updatePost = async (req, res) => {
    const { update } = req.body;
    const { title, message, name } = req.body;

    if (!mongoose.Types) return res.status(404).send(title, message, name, update)

    const updatedPost = { name, title, message };

    await PostTreatment.findByupdateAndUpdate(update, updatedPost, { new: true });

    res.json(updatedPost);
}





export default router;