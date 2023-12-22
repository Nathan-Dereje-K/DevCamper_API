const express = require("express");
const router = express.Router();

router.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

router.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Add a new bootcamp" });
});

router.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Dispaly a single bootcamp ${req.params.id} `,
  });
});

router.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a single bootcamp ${req.params.id} ` });
});

router.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a single bootcamp ${req.params.id} ` });
});

module.exports = router;
