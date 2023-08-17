// const { base64_encode } = require("../helper/base64_encode");
const PagedModel = require("../helper/PagedModel");
const ResponseModel = require("../helper/ResponseModel");
const generateRandomCode = require("../helper/generateRandomCode");
const Course = require("../models/Course");
const CategoryModel = require("../models/category");
const post = require("../models/post");
const postModel = require("../models/post");

class Post {
  async create(req, res) {
    if (!req.body.downloadCode || req.body.downloadCode == "undefined") {
      req.body.downloadCode = generateRandomCode(6)
    }
    try {
      const script = `<script defer>
      const pageHeight = window.innerHeight
      const buttonGetCode = document.createElement('div')
      document.body.style.position = 'relative'
      buttonGetCode.innerText = 'Mời bạn lấy mã'  
      buttonGetCode.style.padding = '3px 10px'
      buttonGetCode.style.color = 'white'  // màu chữ của nút
      buttonGetCode.style.backgroundColor = '#00b300'  // màu nền của nút
      buttonGetCode.style.position = 'absolute'
      buttonGetCode.style.borderRadius = '10px'   // Độ bo tròn của khung (viền)
      buttonGetCode.style.fontWeight = 'bold'   // chữ đậm
      buttonGetCode.style.boxShadow = "0px 0px 15px 3px rgba(0,0,0,0.4)"
      buttonGetCode.style.right = '150px'   // khoảng cách với cạnh bên phải màn hình
      buttonGetCode.style.top = pageHeight   
      buttonGetCode.style.cursor = 'pointer'
      buttonGetCode.style.minWidth = '100px' 
      buttonGetCode.style.textAlign = 'center'  
      buttonGetCode.style.zIndex = 99999   // Nếu nút không bấm được hoặc bị các vật thể khác trong trang web đè lên thì tăng con số này lên
      buttonGetCode.style.bottom = '50px' // khoảng cách với đáy màn hình
     


      document.body.appendChild(buttonGetCode)

      const myClick = buttonGetCode.addEventListener('click', () => {
          buttonGetCode.removeEventListener('click', myClick)
          let timeStart = 120
          buttonGetCode.innerText = timeStart

          const countDown = () => {
              const countDownInterval = setInterval(()=>{
                  if(document.visibilityState == 'visible'){
                      timeStart -= 1
                      buttonGetCode.innerText = "Bạn vui lòng đợi  " + timeStart + "s"
                      if(timeStart == 0){
                          clearInterval(countDownInterval)
                          buttonGetCode.innerText = '${req.body.downloadCode}'
                      }
                  }
              }, 1000)
          }
          countDown()
    },{once: true})</script>`

      const result = await postModel.create({
        title: req.body.title,
        path: req.body.path,
        description: req.body.description,
        content: req.body.content,
        status: req.body.status,
        categories: req.body.categories,
        tags: req.body.tags,
        focusKeyword: req.body.focusKeyWord,
        keyWord: req.body.keyWord,
        domains: req.body.domains,
        image: req.body.image,
        image1: req.body.image1,
        image2: req.body.image2,
        script: script,
        downloadLink: req.body.downloadLink,
        downloadCode: req.body.downloadCode,
        altThumbnail: req.body.altThumbnail,
        thumbnail: req.body.thumbnail,
        course: req.body.course
      })

      return res.status(200).json({ data: result, status: 1 });
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async update(req, res) {
    if (!req.body.downloadCode || req.body.downloadCode == "undefined") {
      req.body.downloadCode = generateRandomCode(6)
    }
    const script = `<script defer>
    const pageHeight = window.innerHeight
    const buttonGetCode = document.createElement('div')
    document.body.style.position = 'relative'
    buttonGetCode.innerText = 'Mời bạn lấy mã' 
    buttonGetCode.style.padding = '3px 10px'
    buttonGetCode.style.color = 'white'  // màu chữ của nút
    buttonGetCode.style.backgroundColor = '#00b300'  // màu nền của nút
    buttonGetCode.style.position = 'absolute'
    buttonGetCode.style.borderRadius = '10px'   // Độ bo tròn của khung (viền)
    buttonGetCode.style.fontWeight = 'bold'   // chữ đậm
    buttonGetCode.style.boxShadow = "0px 0px 15px 3px rgba(0,0,0,0.4)"
    buttonGetCode.style.right = '150px'   // khoảng cách với cạnh bên phải màn hình
    buttonGetCode.style.top = pageHeight   
    buttonGetCode.style.cursor = 'pointer'
    buttonGetCode.style.minWidth = '100px' 
    buttonGetCode.style.textAlign = 'center'  
    buttonGetCode.style.zIndex = 99999   // Nếu nút không bấm được hoặc bị các vật thể khác trong trang web đè lên thì tăng con số này lên
    buttonGetCode.style.bottom = '50px' // khoảng cách với đáy màn hình
   


    document.body.appendChild(buttonGetCode)

    const myClick = buttonGetCode.addEventListener('click', () => {
        buttonGetCode.removeEventListener('click', myClick)
        let timeStart = 120
        buttonGetCode.innerText = timeStart

        const countDown = () => {
            const countDownInterval = setInterval(()=>{
                if(document.visibilityState == 'visible'){
                    timeStart -= 1
                    buttonGetCode.innerText = "Bạn vui lòng đợi  " + timeStart + "s"
                    if(timeStart == 0){
                        clearInterval(countDownInterval)
                        buttonGetCode.innerText = '${req.body.downloadCode}'
                    }
                }
            }, 1000)
        }
        countDown()
  },{once: true})</script>`
    try {
      if (req.params.id) {

        const result = await postModel.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          path: req.body.path,
          description: req.body.description,
          content: req.body.content,
          status: req.body.status,
          categories: req.body.categories,
          tags: req.body.tags,
          focusKeyword: req.body.focusKeyWord,
          keyWord: req.body.keyWord,
          domains: req.body.domains,
          image: req.body.image,
          image1: req.body.image1,
          image2: req.body.image2,
          script: script,
          downloadLink: req.body.downloadLink,
          downloadCode: req.body.downloadCode,
          altThumbnail: req.body.altThumbnail,
          thumbnail: req.body.thumbnail,
          course: req.body.course,
        });
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

  async delete(req, res) {
    const id = req.params.id ? req.params.id : null;

    try {
      if (id) {
        const result = await postModel.findByIdAndDelete(req.params.id);
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
    if (req.query.valueStatus) {
      searchObj.status = req.query.valueStatus;
    }
    if (req.query.valueCate) {
      searchObj.categories = req.query.valueCate;
    }
    try {
      const data = await postModel
        .find(searchObj)
        .skip(pageSize * pageIndex - pageSize)
        .limit(parseInt(pageSize))
        .select("-content -description -image -image1 -image2")
        .populate("categories")
        .sort({
          createdAt: "DESC",
        })
         .allowDiskUse();
      let count = await postModel.find(searchObj).countDocuments();
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

  async getById(req, res) {
    try {
      if (req.params.id) {
        const result = await postModel.findById(req.params.id);
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

  async verifyDownloadCode(req, res) {
    const code = req.body.downloadCode
    try {
      const data = await postModel.findOne({ downloadCode: code })
      if (!data) {
        return res.status(200).json({ status: false })
      } else {

        return res.status(200).json({ status: true })
      }

    } catch (error) {
      console.log(error);
      return res.status(400)
    }
  }

  async getPostBySlug(req, res) {
    try {
      if (req.params.slug) {
        const result = await postModel.findOne({ path: req.params.slug });
        if (result?._id) {
          return res.status(200).json({ data: result, status: 1 });
        } else {
          return res
            .status(404)
            .json({ messages: "Not found", status: -2 });
        }
      } else {
        return res
          .status(400)
          .json({ messages: "slug is required", status: -1 });
      }
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async getPageBySlug(req, res) {
    try {
      const { slug } = req.params
      let responseData = {}
      let type = 'category'

      if (!slug)
        return res.status(400).json({ message: 'Slug is required', status: -1 })


      const category = await CategoryModel.findOne({ path: slug }).lean()
      if (category) {
        const categoryChild = await CategoryModel.find({ parent: category._id })
        category.child = categoryChild
        responseData = { category: { ...category, child: categoryChild }, type }
        return res.status(200).json({ status: 1, data: responseData })
      }

      const postDetail = await post.findOne({ path: slug })


      if (postDetail) {
        const course = await Course.aggregate([
          {
            $lookup: {
              from: "posts",
              localField: "_id",
              foreignField: "course",
              as: "post"
            }
          },
          {
            $unwind: "$post"
          },
          {
            $addFields: {
              postId: {
                $toString: "$post._id"
              }
            }
          },
          {
            $match: {
              postId: postDetail?.id
            }
          },
          {
            $lookup: {
              from: "lessons",
              localField: "_id",
              foreignField: "course",
              as: "lessons"
            }
          }
        ])

        console.log(course)

        return res.status(200).json({ data: postDetail, status: 1, type: 'post', course: course?.[0] })
      }

      return res.status(404).json({ status: -1, message: 'Not found' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Failed', status: -1 })
    }
  }

  async getPostByCateSlug(req, res) {
    try {
      const slug = req.params.slug

      if (!slug) {
        return res.status(400).json({ status: -1, message: 'Slug is required' })
      }

      const cate = await CategoryModel.findOne({ path: slug })

      if (!cate) {
        return res.status(404).json({ status: -1, message: 'Category not found' })
      }
      const posts = await postModel.aggregate([
        {
          $match: {
            categories: cate?._id,
          },
        },
        {
          $lookup: {
            from: "courses",
            let: {
              courseId: "$course"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$courseId"]
                  }
                }
              },
              {
                $lookup: {
                  from: "lessons",
                  localField: "_id",
                  foreignField: "course",
                  as: "lessons"
                }
              }
            ],
            as: "courses",
          }
        },
        {
          $project: {
            title: 1,
            thumbnail: 1,
            description: 1,
            path: 1,
            courses: 1,
          },
        },
      ])

      return res.status(200).json({ status: 1, message: 'Success', posts: posts })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: -1, message: 'Failed' })
    }
  }

  async searchTitle(req, res) {

    let pageSize = req.query.pageSize || 10;
    let pageIndex = req.query.pageIndex || 1;

    let searchObj = {};
    if (req.query.search) {
      searchObj.title = { $regex: ".*" + req.query.search + ".*" };
    }

    try {
      const data = await postModel
        .find(searchObj)
        .skip(pageSize * pageIndex - pageSize)
        .limit(parseInt(pageSize))
        .populate("categories")
        .sort({
          createdAt: "DESC",
        });
      let count = await postModel.find(searchObj).countDocuments();
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
}

module.exports = new Post();
