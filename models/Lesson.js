const mongoose = require("mongoose");

const Lesson = mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref: "courses",
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  videoType: {
    type: String,
    default: "youtube",
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  sourceCode: {
    type: String,
  },
  libraryUsed: {
    type: String,
  },
  contentFinish: {
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
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  document: {
    type: String,
    default: "",
  },
  status: { type: Boolean },
  datecreated: {
    type: Number,
    default: Date.now(),
  },
  code: {
    type: String,
    required: true
  },
  script: {
    type: String,
    default: '',
  },
  introduceCode: {
    type: String,
    default: ''
  },
    order: {
    type: Number,
    required: false,
  }
});

module.exports = mongoose.model("lessons", Lesson);
