import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import treatmentRoutes from './routes/postTreatment.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/testimony', postRoutes);
app.use('/treatments', treatmentRoutes);

const CONNECTION_URL = 'mongodb+srv://infojr83:joaquim2022@cluster0.ctdth.mongodb.net/yourDatabaseName?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    
    serverSelectionTimeoutMS: 5000,  // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
})
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

// Removed mongoose.set('useFindAndModify', false); as it's no longer necessary.
