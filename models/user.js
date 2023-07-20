import mongoose from "mongoose";
import { validateEmail } from "../helpers/index.js";
import uniqueValidator from "mongoose-unique-validator";
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
      type: String,
      validate: {
        validator: validateEmail,
        message: "Please fill a valid email address",
      },
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: {
        message: "Email already exists",
      },
      required: true,
    },
    address: {
      type: String,
      required: { message: "{PATH} is required!" },
      minLength: [6, "Too short, {PATH} must be greater than 6 characters"],
      maxLength: [255, "Too long, {PATH} must be less than 255 characters"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });
const User = mongoose.model("User", userSchema);

export default User;
