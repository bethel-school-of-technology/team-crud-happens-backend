 import dotenv from 'dotenv';
 import express from 'express';
 import mongoose from 'mongoose';

 import multer from 'multer';
 import { Storage } from '@google-cloud/storage';
 import PostMessage from '../models/postMessage.js';

 dotenv.config();

 const router = express.Router();
 const storage = new Storage({
     projectId: process.env.GCLOUD_PROJECT_ID,
     keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,

 });

 console.log(process.env.GCLOUD_STORAGE_BUCKET_URL)
 const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);





 export const getPosts = async(req, res) => {
     try {
         const postMessages = await PostMessage.find();
         console.log(postMessages)

         res.status(200).json(postMessages);
     } catch (error) {
         res.status(404).json({ message: error.message });
     }
 }

 export const getPost = async(req, res) => {
     const { post } = req.body;
     try {
         const Post = await PostMessage.find(post);

         res.status(200).json(Post);
     } catch (error) {
         res.status(404).json({ message: error.message });
     }
 }

 export const createPost = async(req, res, next) => {
     const { title, message, name, tags } = req.body;
     console.log("**************", req.body)
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

         blobWriter.on('finish', async() => {
             const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
             const newPostMessage = new PostMessage({ title, tags, image_url: publicUrl, name, message })
             try {
                 await newPostMessage.save();
                 res.status(201).json(newPostMessage);
             } catch (error) {
                 res.status(409).json({ message: error.message });

             }

         });
         blobWriter.end(req.file.buffer);
     } catch (error) {

         res.status(400).send(`Error, could not upload file: ${error}`);
         return;
     }













 }

 export const updatePost = async(req, res) => {
     const { update } = req.body;
     const { title, message, name, tags } = req.body;

     if (!mongoose.Types) return res.status(404).send(title, message, name, tags, update)

     const updatedPost = { creator, title, message, tags, };

     await PostMessage.findByupdateAndUpdate(update, updatedPost, { new: true });

     res.json(updatedPost);
 }





 export default router;