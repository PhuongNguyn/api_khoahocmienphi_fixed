const router = require("express").Router();
const categoryController = require("../controllers/category");
const authMiddleWare = require("../middlewares/authentication");

router.post('/create',authMiddleWare,categoryController.create)
router.put('/update', authMiddleWare,categoryController.update)
router.delete('/delete/:id', authMiddleWare,categoryController.delete)
router.get('/getAll', categoryController.getAll)
router.get('/getPaging', categoryController.getPaging)
router.get('/getByParentSlug', categoryController.getByParentSlug)
router.get("/getAllParentCategory", categoryController.getAllParentCategory);
router.get("/getHome", categoryController.getHome);
router.get("/getCategoryBySlug/:slug", categoryController.getBySlug)

module.exports = router     
