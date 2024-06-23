const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Content = require("../../models/contentModel");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const contents = JSON.parse(
  fs.readFileSync(`${__dirname}/popular-content.json`, "utf-8")
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Content.create(contents);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Content.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
