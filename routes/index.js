const categoryRouter = require("./category");
const postRouter = require("./post");
const userRouter = require("./user");
const newsRouter = require("./new");
const bannerRouter = require('./Banner')
const courseRouter = require('./course')
const lessonRouter = require('./lesson')

module.exports = (app) => {
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/news", newsRouter);
  app.use("/api/v1/banner", bannerRouter)
  app.use("/api/v1/course", courseRouter)
  app.use("/api/v1/lesson", lessonRouter)
};
