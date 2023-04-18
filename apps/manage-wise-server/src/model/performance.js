const mongoose = require("mongoose");

const performanceSchema = mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    reviewer: { type: String, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String },
    comments: { type: String },
  },
  {
    timestamps: true,
  }
);

const Performance = mongoose.model("Performance", performanceSchema);

module.exports = Performance;
