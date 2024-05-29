const express = require("express");
const globalErrorHandler = require("./middleware/errorHandlerMiddleware");
require("express-async-errors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

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
