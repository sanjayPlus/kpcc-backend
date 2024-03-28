const  mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    date: {
        type: String,
    },
    slug: {
        type: String,
    }
})

module.exports = mongoose.model('Blog', blogSchema)