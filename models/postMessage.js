import mongoose from 'mongoose';

var postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    tags: [String],


    

        createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;