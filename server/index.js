import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from './router/authRouter.js';
import { signup } from './controller/auth.js';

// Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assets");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Mongoose setup

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("connected with database");
  })
  .catch((error) => {
    console.log("database connection error_" + error);
  });


//routes with image upload fn
app.use('/auth/signup', upload.single('picture') , signup);

//ROUTE
app.use('/auth' , authRouter)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
