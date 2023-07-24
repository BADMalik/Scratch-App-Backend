import { Router } from "express";
import {
  getUser as get,
  createUser as create,
  updateUser as update,
  deleteUser as remove,
  login,
} from "../../controllers/userController/index.js";
import {
  createUserMiddleWare,
  loginUserMiddleWare,
} from "../../Middlewares/userMiddleware/index.js";
import passport from "../../Middlewares/authMiddleware/index.js";

/**
 * User Route Registration
 */

const router = Router();

router.get("/", get);

router.get("/:id", get);

/* PUT programming language */
// router.put("/:id", update);

/* DELETE programming language */
// router.delete("/:id", remove);

export default router;
