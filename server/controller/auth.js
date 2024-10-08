import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from 'dotenv';

dotenv.config();

// Sign Up
export const signup = async (req, res) => {
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
      password : hashPass,
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

// Sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    const Matched = await bcrypt.compare(password, user.password);
    
    if (!Matched) {
      return res
        .status(400)
        .json({ success: false, message: "password is not matching" });
    }

    const token = jwt.sign({ id : user.id} , process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);

  } catch (error) {
    res.status(500).json({ error : error.message });
  }
};
