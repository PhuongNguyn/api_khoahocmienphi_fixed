const router = require("express").Router();
const newsController = require("../controllers/news");
const authMiddleWare = require("../middlewares/authentication");

router.get("/getAllNews", newsController.getAllNews);
router.get("/getPaging", newsController.getPaging);
router.get("/getNewsBySlug/:slug", newsController.getNewsBySlug);
router.post("/", authMiddleWare, newsController.create);
router.delete("/:id", authMiddleWare, newsController.delete);
router.get("/:id", newsController.getById);
router.put("/:id", authMiddleWare, newsController.update);

module.exports = router;
