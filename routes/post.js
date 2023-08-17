const router = require('express').Router()
const postController = require('../controllers/post')
const authMiddleWare = require('../middlewares/authentication')

router.post('/create', authMiddleWare,postController.create)
router.put('/update/:id', authMiddleWare,postController.update)
router.delete('/delete/:id', authMiddleWare,postController.delete)
router.get('/getPaging',postController.getPaging)
router.get('/getById/:id', postController.getById)
router.post('/verify-download-code', postController.verifyDownloadCode)
router.get('/getBySlug/:slug', postController.getPostBySlug)
router.get('/getPageBySlug/:slug', postController.getPageBySlug)
router.get('/getPostByCategorySlug/:slug', postController.getPostByCateSlug)
router.get('/searchTitle', postController.searchTitle)


module.exports = router