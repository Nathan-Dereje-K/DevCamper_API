const express = require("express");
const dotenv = require("dotenv");
// Require the routes
const bootcamp = require("./routes/bootcamps");
// Require middleware
const logger = require("./middleware/logger");

//load env files
dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(logger);

//Mount routes
app.use("/api/v1/bootcamps", bootcamp);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
