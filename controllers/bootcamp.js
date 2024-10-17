const Bootcamp = require("../models/Bootcamp");
// getBootcamps , getBootcamp , createBootcamp , updateBootcamp , deleteBootcamp

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
// @Access     Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find(req.body);
    res
      .status(200)
      .json({ success: true, count: bootcamp.length, msg: { bootcamp } });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @Desc       get a specific Bootcamp
// @Route      GET /api/v1/bootcamps/:id
// @Access     Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      msg: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   msg: err,
    // });
    next(err);
  }
};

// @Desc       create Bootcamp
// @Route      POST /api/v1/bootcamps
// @Access     Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      msg: `Bootcamp created successfully`,
      data: { bootcamp },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @Desc       Update Bootcamp
// @Route      PUT /api/v1/bootcamps/:id
// @Access     Private

exports.updateBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

// @Desc       Delete Bootcamp
// @Route      DELETE /api/v1/bootcamps/:id
// @Access     Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Bootcamp.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: `Bootcamp deleted successfully`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
