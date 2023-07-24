import { Router } from "express";
import {
  createUser as create,
  login,
} from "../../controllers/userController/index.js";
import {
  createUserMiddleWare,
  loginUserMiddleWare,
} from "../../Middlewares/userMiddleware/index.js";
import passport from "../../Middlewares/authMiddleware/index.js";

const router = Router();
router.post(
  "/",
  createUserMiddleWare,
  passport.authenticate("signup", { session: false }),
  create
);

router.post("/login", loginUserMiddleWare, (req, res, next) => {
  passport.authenticate("login", async (err, user, _info) => {
    if (err || !user) {
      const error = new Error("An error occurred.");
      return next(error);
    }
    req.user = user; // Attach the authenticated user to the request object
    login(req, res, next); // Call the loginCallback function to continue with login logic
  })(req, res, next);
});

export default router;
