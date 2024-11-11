const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
require("colors");

// Load env file
dotenv.config({ path: "./config/config.env" });

// Load model
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Load db
mongoose.connect(process.env.MONGO_URI, {});

// Parse data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import data to DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete Imported data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data deleted...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
