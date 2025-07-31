import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],

    readTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Blog = mongoose.model("Blog", blogSchema);
