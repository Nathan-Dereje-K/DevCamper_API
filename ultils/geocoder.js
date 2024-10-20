const NodeGeocoder = require("node-geocoder");

// Set up the options with the correct provider and API key
const options = {
  provider: "opencage", // Correct provider name in lowercase
  httpAdapter: "https",
  apiKey: "b439a2e5a7d0466788e35d7b1450152e", // Hardcoded OpenCage API key
  formatter: null,
};

// Create the geocoder instance
const geocoder = NodeGeocoder(options);

// Export the geocoder to use it in other parts of your application
module.exports = geocoder;
