const mongoose = require("mongoose");
const slugify = require("slugify");
const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"],
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: Number,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Pleaseadd a minimum skill level"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Bootcamp",
  },
});

CourseSchema.pre("save", function () {
  this.slug = slugify(this.title, { lower: true });
});

module.exports = mongoose.model("Course", CourseSchema);
