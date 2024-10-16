// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Import routes
const bootcampRoutes = require("./routes/bootcamps");

// Import middleware
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load environment variables from the config file
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Body parser
app.use(express.json());

// Use Morgan for logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use(errorHandler);

// Set up the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  );
});
