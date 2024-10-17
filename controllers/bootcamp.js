// getBootcamps , getBootcamp , createBootcamp , updateBootcamp , deleteBootcamp
const ErrorResponse = require("../ultils/errorResponse");
// const asyncHandler = require("async-handler");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
// @Access     Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, msg: { bootcamp } });
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
    msg: bootcamp,
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
