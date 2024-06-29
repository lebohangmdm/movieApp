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

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many request from this IP. Please again in an hour",
});

app.use("/api", limiter);

const corsOptions = {
  origin: "http://localhost:5173",
  // other options
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "100kb" }));

app.use(mongoSanitize());
app.use(cookieParser());
app.use(hpp());

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
