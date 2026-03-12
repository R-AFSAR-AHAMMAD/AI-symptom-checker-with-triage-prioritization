const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // only allow hospital email
    if (!email.endsWith("@triagecare.com")) {
      res.status(400);
      res.json({ message: "Only @triagecare.com email addresses are allowed" });
      return;
    }

    // check if staff already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      res.status(400);
      res.json({ message: "Staff already exists" });
      return;
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save to db
    const staff = new Staff({ name, email, password: hashedPassword });
    await staff.save();

    res.status(201);
    res.json({ message: "Staff registered successfully" });

  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if staff exists
    const staff = await Staff.findOne({ email });
    if (!staff) {
      res.status(400);
      res.json({ message: "Invalid email" });
      return;
    }

    // check password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      res.status(400);
      res.json({ message: "Invalid password" });
      return;
    }

    // generate token
    const payload = { id: staff._id, email: staff.email };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ jwtToken });

  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

module.exports = router;