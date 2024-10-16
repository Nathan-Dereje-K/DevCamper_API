const Bootcamp = require("../models/Bootcamp");
// getBootcamps , getBootcamp , createBootcamp , updateBootcamp , deleteBootcamp

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
// @Access     Public

exports.getBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find(req.body);
  res.status(200).json({ success: true, msg: { bootcamps } });
};

// @Desc       get a specific Bootcamp
// @Route      GET /api/v1/bootcamps/:id
// @Access     Public

exports.getBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findById(id);
  res.status(200).json({
    success: true,
    msg: bootcamp,
  });
};

// @Desc       create Bootcamp
// @Route      POST /api/v1/bootcamps
// @Access     Private

exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Bootcamp created successfully`,
    data: { bootcamp },
  });
};

// @Desc       Update Bootcamp
// @Route      PUT /api/v1/bootcamps/:id
// @Access     Private

exports.updateBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndUpdate(id);

  const updatedBootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    msg: "Updated",
  });

  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id} ` });
};

// @Desc       Delete Bootcamp
// @Route      DELETE /api/v1/bootcamps/:id
// @Access     Private

exports.deleteBootcamp = async (req, res, next) => {
  const id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    msg: `Bootcamp deleted successfully`,
    msg: bootcamp,
  });
};
