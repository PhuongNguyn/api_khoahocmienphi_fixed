const PagedModel = require("../helper/PagedModel");
const ResponseModel = require("../helper/ResponseModel");
const categoryModel = require("../models/category");
const PostModel = require("../models/post");

class Category {
  async create(req, res) {
    try {
      const check = await categoryModel.find({ name: req.body.name });
      if (check.length == 0) {
        const result = await categoryModel.create({
          name: req.body.name,
          parent: req.body.parent || [],
          path: req.body.path,
          categorySchema: req.body.schema,
          description: req.body.description,
          meta: req.body.meta,
        });
        return res.status(200).json({ data: result, status: 1 });
      } else {
        return res
          .status(400)
          .json({ messages: "category is already exist", status: -1 });
      }
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }
  async update(req, res) {
    try {
      const result = await categoryModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        parent: req.body.parent || [],
        path: req.body.path,
        categorySchema: req.body.schema,
        description: req.body.description,
        meta: req.body.meta,
      });
      return res
        .status(200)
        .json({ message: "success", data: result, status: 1 });
    } catch (error) {
      return res.status(400);
    }
  }

  async delete(req, res) {
    // console.log(req.params , 'id');
    // return
    const id = req.params.id ? req.params.id : null;
    try {
      if (id) {
        const result = await categoryModel.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json({ message: "success", data: result, status: 1 });
      } else {
        res.status(400).json({
          message: "Not found Id",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async getAll(req, res) {
    try {
      const result = await categoryModel.find();
      return res.status(200).json({ message: "success", data: result });
    } catch (error) {
      return res.status(400);
    }
  }

  async getAllParentCategory(req, res) {
    try {
      const result = await categoryModel
        .find({})
        .populate("parent")
        .sort({
          createdAt: 1,
        })
        .lean();

      const resp = result
        .map((item) => {
          if (item?.parent?.length > 0) {
            return null;
          } else {
            return {
              ...item,
              child: result?.filter((e) => {
                return e?.parent
                  ?.map((i) => i?._id?.toString())
                  .includes(item?._id?.toString());
              }),
            };
          }
        })
        .filter((e) => e);

      return res.status(200).json({ message: "success", data: resp });
    } catch (error) {
      return res.status(400);
    }
  }

  async getPaging(req, res) {
    let pageSize = req.query.pageSize || 10;
    let pageIndex = req.query.pageIndex || 1;
    let searchObj = {};
    if (req.query.search) {
      searchObj.name = { $regex: ".*" + req.query.search + ".*" };
    }
    try {
      const data = await categoryModel
        .find(searchObj)
        .skip(pageSize * pageIndex - pageSize)
        .limit(parseInt(pageSize))
        .sort({
          createdAt: "DESC",
        });
      let count = await categoryModel.find(searchObj).countDocuments();
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
      let response = new ResponseModel(404, error.message, error);
      res.status(404).json(response);
    }
  }

  async getByParentSlug(req, res) {
    try {
      const slug = req.params.slug;

      if (!slug) {
        return res
          .status(400)
          .json({ status: -1, message: "Slug is required" });
      }

      const category = categoryModel.findOne({ path: slug });

      if (!category) {
        return res.status(404).json({ message: "Not found category" });
      }

      const categoryChild = await categoryModel.find({ parent: category._id });

      return res
        .status(200)
        .json({ message: "Get success", status: 1, category: categoryChild });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed", status: -1 });
    }
  }

  async getHome(req, res) {
    try {
      const categories = await categoryModel.aggregate([
        {
          $addFields: {
            id: {
              $toString: "$_id",
            },
          },
        },
        {
          $match: {
            parent: {
              $size: 0,
            },
          },
        },
      ]);

      return res.status(200).json({
        status: 1,
        data: {
          categoryList: categories,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed", status: -1 });
    }
  }

  async getBySlug(req, res) {
    try {
      const slug = req.params.slug;
      const result = await categoryModel.findOne({ path: slug });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Failed", status: -1 });
    }
  }
}

module.exports = new Category();
