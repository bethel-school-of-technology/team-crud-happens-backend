import mongoose from 'mongoose';

var postSchema = mongoose.Schema({
    title: String,
    message: String,
    Name: String,
    tag: [String],
    selectFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;