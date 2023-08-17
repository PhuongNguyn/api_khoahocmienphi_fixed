const authMiddleWare = require('../middlewares/authentication')
const LessonController = require('../controllers/lesson')

const router = require('express').Router()

router.post('/', authMiddleWare, LessonController.createLesson)
router.get('/get-paging', LessonController.getPagingLesson)
router.get('/get-by-id/:id', LessonController.getLessonById)
router.put("/", authMiddleWare, LessonController.updateLesson)
router.delete('/:id', LessonController.deleteLesson)
router.post('/validate-lesson-code/:id', LessonController.validateLessonCode)
// router.get('/:slug', LessonController.getLessonBySlug)

module.exports = router