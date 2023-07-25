import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    res.send({
      success: true,
      message: "User Created Successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    req.login(req.user, { session: false }, async (error) => {
      if (error) return next(error);

      const token = jwt.sign({ user: req.body }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({ token, user: req.user });
    });
  } catch (e) {
    next(e);
  }
};

export const getUsers = (req, res) => {
  console.log("getUsers");
  res.send("getUsers");
};
export const getUser = (req, res) => {
  res.send("getUser");
};
export const updateUser = (req, res) => {
  res.send("updateUser");
};
export const deleteUser = (req, res) => {
  res.send("deleteUser");
};
