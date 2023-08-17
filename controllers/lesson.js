const generateRandomcode = require("../helper/generateRandomCode");
const toSlug = require("../helper/toSlug");
const Lesson = require("../models/Lesson");
const categoryModel = require("../models/category");

class LessonController {

  async createLesson(req, res) {
    try {
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
      req.body.datecreated = Date.now();

      if (!req.body.code || req.body.code == "undefined") {
        req.body.code = generateRandomcode()
      }

      const script = `<script>
      const pageHeight = window.innerHeight
      const buttonGetCode = document.createElement('div')
      buttonGetCode.innerText = 'Lấy Mã'
      buttonGetCode.style.padding = '5px 10px'
      buttonGetCode.style.color = 'white'
      buttonGetCode.style.backgroundColor = 'red'
      buttonGetCode.style.position = 'absolute'
      buttonGetCode.style.right = '0'
      buttonGetCode.style.top = pageHeight 
      buttonGetCode.style.cursor = 'pointer'
      buttonGetCode.style.minWidth = '100px'
      buttonGetCode.style.textAlign = 'center'
     


      document.body.appendChild(buttonGetCode)

      const myClick = buttonGetCode.addEventListener('click', () => {
          buttonGetCode.removeEventListener('click', myClick)
          let timeStart = 3
          buttonGetCode.innerText = timeStart

          const countDown = () => {
              const countDownInterval = setInterval(()=>{
                  if(document.visibilityState == 'visible'){
                      timeStart -= 1
                      buttonGetCode.innerText = timeStart
                      if(timeStart == 0){
                          clearInterval(countDownInterval)
                          buttonGetCode.innerText = "${req.body.code}"
                      }
                  }
              }, 1000)
          }
          countDown()
    },{once: true})</script>`

      req.body.script = script

      const Lessons = await Lesson.create(req.body);

      return res
        .status(200)
        .json({ status: 1, message: "Tạo bài giảng thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async updateLesson(req, res) {
    try {
      console.log(req.body)
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

      if (!req.body.code || req.body.code == "undefined") {
        req.body.code = generateRandomcode()
        console.log(generateRandomcode())
      }
      const script = `<script>
      const pageHeight = window.innerHeight
      const buttonGetCode = document.createElement('div')
      buttonGetCode.innerText = 'Lấy Mã'
      buttonGetCode.style.padding = '5px 10px'
      buttonGetCode.style.color = 'white'
      buttonGetCode.style.backgroundColor = 'red'
      buttonGetCode.style.position = 'absolute'
      buttonGetCode.style.right = '0'
      buttonGetCode.style.top = pageHeight 
      buttonGetCode.style.cursor = 'pointer'
      buttonGetCode.style.minWidth = '100px'
      buttonGetCode.style.textAlign = 'center'
     


      document.body.appendChild(buttonGetCode)

      const myClick = buttonGetCode.addEventListener('click', () => {
          buttonGetCode.removeEventListener('click', myClick)
          let timeStart = 3
          buttonGetCode.innerText = timeStart

          const countDown = () => {
              const countDownInterval = setInterval(()=>{
                  if(document.visibilityState == 'visible'){
                      timeStart -= 1
                      buttonGetCode.innerText = timeStart
                      if(timeStart == 0){
                          clearInterval(countDownInterval)
                          buttonGetCode.innerText = "${req.body.code}"
                      }
                  }
              }, 1000)
          }
          countDown()
    },{once: true})</script>`

      req.body.script = script

      const Lessons = await Lesson.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json({ status: 1, message: "Tạo bài giảng thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getLessonBySlug(req, res) {
    const slug = req.params.slug;
    try {
      const Lesson = await Lesson.findOne({ slug, status: true });

      return res.status(200).json(Lesson);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getPagingLesson(req, res) {
    const pageSize = Number(req.query.pageSize);
    const pageIndex = Number(req.query.pageIndex);
    const search = req.query.search || "";
    const course = req.query.course || "";
    const status = Number(req.query.status) || 0;
    
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
        ...(course
          ? {
            course,
          }
          : {}),
          ...(status
            ? {
              status: status === 1 ? true : false,
            }
            : {}),
      };

      const result = await Lesson.find(searchObj)
        .sort({
          datecreate: -1,
          ...(course
            ? {
              order: 1,
            }
            : {}),
        })
        .skip(pageSize * pageIndex - pageSize)
        .limit(pageSize)
        .populate("course");
      const count = await Lesson.find(searchObj).countDocuments();
      const totalPages = Math.ceil(count / Number(pageSize));

      return res.status(200).json({
        lessons: result,
        totalPages,
        totalDoc: count,
        pageSize: Number(pageSize),
        pageIndex: Number(pageIndex),
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getLessonById(req, res) {
    const id = req.params.id;
    try {
      const result = await Lesson.findById(id);

      return res.status(200).json({
        lesson: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteLesson(req, res) {
    try {
      const id = req.params.id;

      const result = await Lesson.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ status: 1, message: "Xóa bài giảng thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async validateLessonCode(req, res){
    try {
      const lessonCode = req.query.lessonCode
      const lessonId = req.params.id
      
      const findLesson = await Lesson.findById(lessonId)
      if(!findLesson){
        return res.status(404).json({message: "Không tìm thấy khóa học"})
      }
      if(findLesson.code === lessonCode){
        return res.status(200).json({status: 1, message: "Xác thực thành công video đang được tải xuống"})
      } else{
        return res.status(404).json({message: "Sai mã xác thực"})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}



module.exports = new LessonController();
