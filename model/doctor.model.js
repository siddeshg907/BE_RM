const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    name: String,
    imageURL: String,
    specialization: String,
    experience: String,
    location: String,
    date: Date,
    slots: Number,
    fee: Number,
  },
  {
    versionKey: false,
  }
);

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = {
  DoctorModel,
};
