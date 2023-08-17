const toSlug = require("../helper/toSlug");
const Course = require("../models/Course");
const categoryModel = require("../models/category");

class CourseController {

  async getAllCourse (req, res) {
    try {
      const courses = await Course.find({})

      return res.status(200).json(courses)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async createCourse(req, res) {
    try {
      if (req.files.thumbnail) {
        const file = req.files.thumbnail;
        file.mv(`${__dirname}/../public/uploads/${file.name}`, (err) => {
          if (err)
            return res.status(500).json({ message: "Failed", status: -1 });
        });
      }
      req.body.thumbnail = req.files.thumbnail?.name;

      if (!req.body.slug) {
        req.body.slug = toSlug(req.body.title);
      }
      req.body.datecreated = Date.now();
      const courses = await Course.create(req.body);

      return res
        .status(200)
        .json({ status: 1, message: "Tạo khóa học thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async updateCourse(req, res) {
    try {
      delete req.body.thumbnail;

      if (req.files && req.files.thumbnail) {
        const file = req.files.thumbnail;
        file.mv(`${__dirname}/../public/uploads/${file.name}`, (err) => {
          if (err)
            return res.status(500).json({ message: "Failed", status: -1 });
        });

        req.body.thumbnail = req.files.thumbnail?.name;
      }

      if (!req.body.slug) {
        req.body.slug = toSlug(req.body.title);
      }

      const course = await Course.findByIdAndUpdate(
        req.body.id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({ status: 1, message: "Tạo khóa học thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getPagingCourse(req, res) {
    const pageSize = Number(req.query.pageSize);
    const pageIndex = Number(req.query.pageIndex);
    const search = req.query.search || "";
    const category = req.query.category || "";

    try {
      const searchObj = {
        status: true,
        ...(search
          ? {
              title: {
                $regex: `.*${search}.*`,
                $options: "i",
              },
            }
          : {}),
      };

      const course = await Course.find(searchObj)
        .sort({
          datecreate: -1,
        })
        .skip(pageSize * pageIndex - pageSize)
        .limit(pageSize)
      const count = await Course.find(searchObj).countDocuments();
      const totalPages = Math.ceil(count / Number(pageSize));

      return res.status(200).json({
        courses: course,
        totalPages,
        totalDoc: count,
        pageSize: Number(pageSize),
        pageIndex: Number(pageIndex),
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCourseBySlug(req, res) {
    const slug = req.params.slug;
    try {
      const course = await Course.findOne({ slug, status: true });

      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCourseById(req, res) {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);

      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCourseByCategory(req, res) {
    const categorSlug = req.query.category;
    const pageSize = Number(req.query.pageSize) || 8;
    const pageIndex = Number(req.query.pageIndex) || 1;
    try {
      const category = await categoryModel.findOne({ path: categorSlug });
      if (category) {
        // const course = await Course.find({status: true, category: category?._id}).skip(pageSize * pageIndex - pageSize).limit(pageSize).populate("category")
        const result = await Course.aggregate([
          {
            $match: {
              status: true,
              category: category?._id,
            },
          },
          {
            $lookup: {
              from: "lessons",
              let: {
                courseId: "$_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$course", "$$courseId"],
                    },
                  },
                },
                {
                  $sort: {
                    datecreated: -1,
                  },
                },
              ],
              as: "lessons",
            },
          },
          {
            $sort: {
              datecreate: -1,
            },
          },
          {
            $skip: (pageIndex - 1) * pageSize,
          },
          {
            $limit: pageSize,
          },
        ]);

        const count = await Course.find({
          status: true,
          category: category?._id,
        }).countDocuments();
        const totalPages = Math.ceil(count / Number(pageSize));

        return res.status(200).json({
          courses: result,
          totalPages,
          totalDoc: count,
          pageSize: Number(pageSize),
          pageIndex: Number(pageIndex),
        });
      }

      return res.status(404).json({ message: "Category not found" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllCourseByCategoryId(req, res) {
    const id = req.params.id;

    try {
      const category = await categoryModel.findById(id);

      if (category) {
        const course = await Course.find({
          status: true,
          category: category?._id,
        }).populate("category");

        const count = await Course.find({
          status: true,
          category: category?._id,
        }).countDocuments();

        return res.status(200).json({
          courses: course,
          totalDoc: count,
        });
      }

      return res.status(404).json({ message: "Category not found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteCourse(req, res) {
    try {
      const id = req.params.id;

      const result = await Course.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ status: 1, message: "Xóa khóa học thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = new CourseController();
