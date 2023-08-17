const authMiddleWare = require('../middlewares/authentication')
const CourseController = require('../controllers/Course')

const router = require('express').Router()

router.post('/', authMiddleWare, CourseController.createCourse)
router.get('/get-all-courses', CourseController.getAllCourse)
router.get('/get-paging', CourseController.getPagingCourse)
router.put("/", authMiddleWare, CourseController.updateCourse)
router.get('/get-by-category', CourseController.getCourseByCategory)
router.get('/get-by-id/:id', CourseController.getCourseById)
router.delete('/:id', CourseController.deleteCourse)
router.get('/get-all-courses-by-category-id/:id', CourseController.getAllCourseByCategoryId)
router.get('/:slug', CourseController.getCourseBySlug)

module.exports = router