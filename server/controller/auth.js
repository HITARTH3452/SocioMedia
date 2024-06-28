import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modle/User.js";

// Sign Up

export const signup = async (req, res) => {
    console.log("running")
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hashPass,
      picturePath,
      friends,
      location,
      occupation,
      viewProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
