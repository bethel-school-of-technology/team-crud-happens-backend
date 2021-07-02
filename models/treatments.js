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

const PostTreatment = mongoose.model('PostTreatment', postSchema);

export default PostTreatment;