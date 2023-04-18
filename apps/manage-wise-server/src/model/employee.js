const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "please provide valid email !!" });
        }
      },
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    documents: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
        filePath: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
