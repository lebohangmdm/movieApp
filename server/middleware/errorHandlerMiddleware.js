const AppError = require("../utils/AppError");

const handleDuplicateKeyError = (err, res) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  if (err.keyValue.email.includes("@" && ".com")) {
    message = `The user with this email (${err.keyValue.email}) already exist`;
    return new AppError(message, 400);
  } else {
    message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }
};

const handleCastError = (err, res) => {
  return new AppError(
    `The provided ID ${err.value} is not a valid identifier for ${err.path}. Please check and try again.`,
    400
  );
};

const handleValidationError = (err, res) => {
  const message = Object.values(err.errors)
    .map((err) => err.message)
    .join(", ");

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please try log in again", 401);

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong, Please try again later!",
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    if (err.code === 11000) err = handleDuplicateKeyError(err, res);
    if (err.name === "CastError") err = handleCastError(err, res);
    if (err.name === "ValidationError") err = handleValidationError(err, res);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendProdError(err, res);
  }
  next();
};
