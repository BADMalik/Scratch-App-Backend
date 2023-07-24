import mongoose from "mongoose";
import { validateEmail } from "../helpers/index.js";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

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
  { select: "-__v -password" },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

/**
 * Hash the password before saving the user model
 */
userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

/**
 *  Helper method for validating user's password.
 * @param {*} password
 * @returns
 */
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
const User = mongoose.model("User", userSchema);

export default User;
