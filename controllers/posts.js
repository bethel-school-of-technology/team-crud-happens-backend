import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async(req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async(req, res) => {
    const { post } = req.params;

    try {
        const Post = await PostMessage.find(post);

        res.status(200).json(Post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const {title, message, name, tags } = req.params;

    const newPostMessage = new PostMessage({ title, tags, message })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async(req, res) => {
    const { update } = req.params;
    const { title, message, name, tags } = req.body;

    if (!mongoose.Types) return res.status(404).send(title,message, name, tags, update)

    const updatedPost = { creator, title, message, tags, };

    await PostMessage.findByupdateAndUpdate(update, updatedPost, { new: true });

    res.json(updatedPost);
}





export default router;