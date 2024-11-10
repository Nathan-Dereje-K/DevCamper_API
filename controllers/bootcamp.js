// getBootcamps , getBootcamp , createBootcamp , updateBootcamp , deleteBootcamp, getBootcampsInRadius
const ErrorResponse = require("../utils/errorResponse");
// const asyncHandler = require("async-handler");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
// @Access     Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query into a new object to avoid mutating it
  const reqQuery = { ...req.query };

  // Words to remove from query
  const removeWords = ["select", "sort", "page", "limit"];

  // Remove unwanted words from reqQuery
  removeWords.forEach((word) => delete reqQuery[word]);

  // Convert the modified reqQuery to a query string
  let queryStr = JSON.stringify(reqQuery);

  // Add MongoDB operators like $gt, $gte, etc.
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding the resource with the parsed query
  query = Bootcamp.find(JSON.parse(queryStr));
  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // Sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // Execute the query
  const bootcamp = await query;

  // Pagination result
  const pagination = {};
  const lastPage = Math.ceil(total / limit);
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamp.length,
    pagination,
    data: bootcamp,
  });
});

// @Desc       get a specific Bootcamp
// @Route      GET /api/v1/bootcamps/:id
// @Access     Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @Desc       create Bootcamp
// @Route      POST /api/v1/bootcamps
// @Access     Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Bootcamp created successfully`,
    data: { bootcamp },
  });
});

// @Desc       Update Bootcamp
// @Route      PUT /api/v1/bootcamps/:id
// @Access     Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @Desc       Delete Bootcamp
// @Route      DELETE /api/v1/bootcamps/:id
// @Access     Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndDelete(id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    msg: `Bootcamp deleted successfully`,
  });
});

// @Desc       Get Bootcamp with in radius
// @Route      Get /api/v1/bootcamps/radius/:zipcode/:distance
// @Access     Public

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);

  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Radius of the Earth in mile = 3,958 mi || in Killometer = 6,371 KM
  const radius = distance / 3958;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(201).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
