const mongoose = require('mongoose')

const Course = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    introduceVideo: {
        type: String,
    },
    description: {
        type: String,
    },
    participant: {
        type: String,
    },
    knowledge: {
        type: String,
    },
    libraryUsed: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    rating: {
        type: Number,
        default: 5,
    },
    author: {
        type: String,
        default: ""
    },
    views: {
        type: Number, 
        default: 0
    },
    document: {
        type: String, 
        default: ""
    },
    status: {type: Boolean},
    datecreated: {
        type: Number,
        default: Date.now(),
      },
})

module.exports = mongoose.model("courses", Course)
