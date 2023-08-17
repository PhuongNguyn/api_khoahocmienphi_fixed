const mongoose = require('mongoose')

const Post = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'title không được bỏ trống'],
    },
    //đường dẫn
    path: {
        type: String,
        required: [true, 'path không được bỏ trống'],
    },
    course: {
        type: mongoose.Types.ObjectId,
    },
    //mô tả
    description: {
        type: String,
        required: [true, 'description không được bỏ trống'],
    },
    //nội dung
    content: {
        type: String,
        required: [true, 'content không được bỏ trống'],
    },
    //trạng thái
    status: {
        type: Number,
        required: [true, 'status không được bỏ trống'],
    },
    //chuyên mục
    categories:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'categories',
            required: [true, 'categories không được bỏ trống'],
        }
    ],
    focusKeyword:[
        {
            type: String,
            required: [true, 'focusKeyword không được bỏ trống'],
        }
    ],
    domains: {
        type: String,
        required: [true, 'domain không được bỏ trống'],
    },
    image: {
        type: String,
        required: [true, 'image không được bỏ trống'],
    },
    image1: {
        type: String,
        required: [true, 'image1 không được bỏ trống'],
    },
    image2: {
        type: String,
        required: [true, 'image2 không được bỏ trống'],
    },
    script:{
        type:String
    },
    downloadLink:{
        type:String,
        required: [true, 'downloadLink không được bỏ trống'],
    },
    downloadCode:{
        type: String,
        required: [true, 'downloadCode không được bỏ trống']
    },
    altThumbnail: {
        type: String,
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail không được bỏ trống'],
    }

}
,
 {timestamps: true}
 )

module.exports = mongoose.model('posts', Post)