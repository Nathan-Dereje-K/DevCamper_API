// getCourses , getCourse , createCourse , updateCourse , deleteCourse
const ErrorResponse = require("../middleware/error");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

// @Desc       get all Courses
// @Route      GET /api/v1/courses/
// @Access     Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  const course = await Course.find();
  res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});

// @Desc       get a specific Courses
// @Route      GET /api/v1/courses/:id
// @Access     public

exports.getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @Desc       create a course
// @Route      POST /api/v1/courses/
// @Access     private

exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: { course },
  });
});

// @Desc       Edit a single course
// @Route      PUT /api/v1/courses/:id
// @Access     private

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @Desc       Delete a single course
// @Route      DELETE /api/v1/courses/
// @Access     private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    message: `Course with an id of ${id} deleted successfully`,
  });
});
