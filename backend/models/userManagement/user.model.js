const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    passwordHash: { type: String, required: true },
    userType: { type: String, default: "customer" },
    verified: { type: Boolean, default: false },
    adminCreated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
