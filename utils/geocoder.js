const dotenv = require("dotenv");
const NodeGeocoder = require("node-geocoder");
dotenv.config({ path: "./config/config.env" });
// Set up the options with the correct provider and API key
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

// Create the geocoder instance
const geocoder = NodeGeocoder(options);

// Export the geocoder to use it in other parts of your application
module.exports = geocoder;
