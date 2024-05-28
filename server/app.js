const express = require("express");
require("express-async-errors");
const authRouter = require("./routes/authRoute");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);

module.exports = app;
