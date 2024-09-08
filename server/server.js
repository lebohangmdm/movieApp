const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
  console.log(err.name, err.message);
  process.exit(1);
});

require("dotenv").config({ path: "../config.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);

  server.close(() => {
    console.log("Shutting down");
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down");
  server.close(() => {
    console.log("shutting down");
  });
});
