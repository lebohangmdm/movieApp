const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

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
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
