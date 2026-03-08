const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    symptoms: {
      type: [String],
      required: true,
    },
    urgency: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["waiting", "in_progress", "resolved"],
      default: "waiting",
    },
  },
  { timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
