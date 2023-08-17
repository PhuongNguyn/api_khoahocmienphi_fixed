const mongoose = require("mongoose");

const News = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title không được bỏ trống"],
    },
    //đường dẫn
    path: {
      type: String,
      required: [true, "path không được bỏ trống"],
    },
    //mô tả
    description: {
      type: String,
      required: [true, "description không được bỏ trống"],
    },
    //nội dung
    content: {
      type: String,
      required: [true, "content không được bỏ trống"],
    },
    //trạng thái
    status: {
      type: Number,
      required: [true, "status không được bỏ trống"],
    },
    //chuyên mục
    altThumbnail: {
      type: String,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail không được bỏ trống"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("news", News);
