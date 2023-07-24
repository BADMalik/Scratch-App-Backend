import { validateRequest } from "../../helpers/index.js";

const createUserRules = {
  email: "required|string|email|max:100",
  name: "required|string",
  password: "required|string|min:6|confirmed",
  address: "string|min:6|max:255",
};

const loginUserRules = {
  email: "required|string|email|max:100",
  password: "required|string|min:6",
};

const createUserMiddleWare = async (req, res, next) => {
  await validateRequest(createUserRules, req, res, next);
};

const loginUserMiddleWare = async (req, res, next) => {
  await validateRequest(loginUserRules, req, res, next);
};

export { createUserMiddleWare, loginUserMiddleWare };
