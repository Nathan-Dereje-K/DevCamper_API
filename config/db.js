const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log(
      `MongoDB Connected: ${mongoose.connection.host}`.cyan.bold.underline
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Error:",
      error.message.red.bold.underline
    );
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
