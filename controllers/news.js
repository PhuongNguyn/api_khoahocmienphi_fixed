const PagedModel = require("../helper/PagedModel");
const ResponseModel = require("../helper/ResponseModel");
const NewsModel = require("../models/news");

class NewController {
  async create(req, res) {
    try {
      const result = await NewsModel.create({
        title: req.body.title,
        path: req.body.path,
        description: req.body.description,
        content: req.body.content,
        status: req.body.status,
        altThumbnail: req.body.altThumbnail,
        thumbnail: req.body.thumbnail,
      });
      return res.status(200).json({ data: result, status: 1 });
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async update(req, res) {
    try {
      if (req.params.id) {
        const result = await NewsModel.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          path: req.body.path,
          description: req.body.description,
          content: req.body.content,
          status: req.body.status,
          altThumbnail: req.body.altThumbnail,
          thumbnail: req.body.thumbnail,
        });
        return res
          .status(200)
          .json({ message: "success", data: result, status: 1 });
      } else {
        res.status(400).json({
          status: -1,
          message: "Not found id",
        });
      }
    } catch (error) {
      return res.status(400);
    }
  }

  async delete(req, res) {
    const id = req.params.id ? req.params.id : null;

    try {
      if (id) {
        const result = await NewsModel.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json({ message: "success", data: result, status: 1 });
      } else {
        res.status(400).json({
          message: "Not found id",
        });
      }
    } catch (error) {
      return res.status(400);
    }
  }
  async getPaging(req, res) {
    let pageSize = req.query.pageSize || 10;
    let pageIndex = req.query.pageIndex || 1;

    let searchObj = {};
    if (req.query.search) {
      searchObj.title = { $regex: ".*" + req.query.search + ".*" };
    }
    if (req.query.status) {
      searchObj.status = req.query.status;
    }
    try {
      const data = await NewsModel.find(searchObj)
        .skip(pageSize * pageIndex - pageSize)
        .limit(parseInt(pageSize))
        .sort({
          createdAt: "DESC",
        });
      let count = await NewsModel.find(searchObj).countDocuments();
      let totalPages = Math.ceil(count / pageSize);
      let pagedModel = new PagedModel(
        pageIndex,
        pageSize,
        totalPages,
        data,
        count
      );

      res.json(pagedModel);
    } catch (error) {
      console.log(error);
      let response = new ResponseModel(404, error.message, error);
      res.status(404).json(response);
    }
  }

  async getById(req, res) {
    try {
      if (req.params.id) {
        const result = await NewsModel.findById(req.params.id);
        if (result?._id) {
          return res.status(200).json({ data: result, status: 1 });
        } else {
          return res
            .status(400)
            .json({ messages: "Id không hợp lệ", status: -2 });
        }
      } else {
        return res
          .status(400)
          .json({ messages: "post is already exist", status: -1 });
      }
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async getAllNews(req, res) {
    try {
      const result = await NewsModel.find({}).select("-content -description");
      console.log(result);
      return res.status(200).json({ news: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed" });
    }
  }

  async getNewsBySlug(req, res) {
    try {
      const result = await NewsModel.findOne({ path: req.params.slug });
      return res.status(200).json({ news: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed" });
    }
  }
}

module.exports = new NewController();
