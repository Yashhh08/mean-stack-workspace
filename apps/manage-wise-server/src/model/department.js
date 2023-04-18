const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    head: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
