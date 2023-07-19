import mongoose from "mongoose";
import { validateEmail } from "../helpers/validators.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [6, "Too short, min is 6 characters"],
      max: [32, "Too long, max is 32 characters"],
    }, // String is shorthand for {type: String}
    email: {
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,

      min: [6, "Too short, body is 6 characters"],
      max: [255, "Too long, body is 255 characters"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
