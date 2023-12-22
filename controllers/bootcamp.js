// getBootcamps , getBootcamp , createBootcamp , updateBootcamp , deleteBootcamp

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
// @Access     Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

// @Desc       get a specific Bootcamp
// @Route      GET /api/v1/bootcamps/:id
// @Access     Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Dispaly a single bootcamp ${req.params.id} `,
  });
};

// @Desc       create Bootcamp
// @Route      POST /api/v1/bootcamps
// @Access     Private

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Add a new bootcamp" });
};

// @Desc       Update Bootcamp
// @Route      PUT /api/v1/bootcamps/:id
// @Access     Private

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a single bootcamp ${req.params.id} ` });
};

// @Desc       Delete Bootcamp
// @Route      DELETE /api/v1/bootcamps/:id
// @Access     Private

exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a single bootcamp ${req.params.id} ` });
};
