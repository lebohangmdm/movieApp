const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./middleware/errorHandlerMiddleware");
const hpp = require("hpp");
require("express-async-errors");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const contentRouter = require("./routes/contentRoute");
const reviewRouter = require("./routes/reviewRoute");
const AppError = require("./utils/AppError");
const path = require("path");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

console.log(process.env.JWT_SECRET);

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many request from this IP. Please again in an hour",
});

app.use("/api", limiter);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
// app.use("/images", express.static("server/public/images"));
// app.use(express.static("./public"));
// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser(process.env.JWT_SECRET));
// app.get("/api/v1", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("cookie");
// });

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use("*", (req, res, next) => {
  return next(
    new AppError(
      `This route does not exist ${req.originalUrl} in the server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
