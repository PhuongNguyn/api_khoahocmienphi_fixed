var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const routes = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db/index");
const dotenv = require("dotenv");
const { autoCreateAccount } = require("./controllers/user");
const fileUpload = require('express-fileupload')

dotenv.config();

var app = express();

// view engine setup
var origin_urls;
if (process.env.NODE_ENV == "development") {
  origin_urls = [
    `${process.env.CLIENT_DEV_URL}`,
    `${process.env.ADMIN_DEV_URL}`,
  ];
} else if (process.env.NODE_ENV == "production") {
  origin_urls = [`${process.env.CLIENT_URL}`, `${process.env.ADMIN_URL}`];
}
const corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
  origin: ["http://localhost:3001", "http://localhost:3000", "https://khoahocmienphi.net", "https://admin.khoahocmienphi.net"],
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

app.use(fileUpload());

routes(app);
db();
autoCreateAccount();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
