import User from "../../models/user.js";

export const createUser = async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);
    await newUser.validate();
    res.send(newUser);
  } catch (e) {
    next(e.errors);
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
