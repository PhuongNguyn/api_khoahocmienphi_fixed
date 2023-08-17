const mongoose = require("mongoose");

const Category = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name không được bỏ trống"],
    },
    parent: [
      {
        type: mongoose.Types.ObjectId,
        ref: "categories",
      },
    ],
    path: {
      type: String,
      required: [true, "path không được bỏ trống"],
    },
    categorySchema: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    meta: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", Category);
