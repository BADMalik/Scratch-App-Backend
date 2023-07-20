import { Router } from "express";
import {
  getUser as get,
  createUser as create,
  updateUser as update,
  deleteUser as remove,
} from "../controllers/userController/index.js";
import { createUserMiddleWare } from "../Middlewares/userMiddleware/index.js";

/**
 * User Route Registration
 */

const router = Router();

router.get("/", get);

router.get("/:id", get);

router.post("/", createUserMiddleWare, create);

/* PUT programming language */
// router.put("/:id", update);

/* DELETE programming language */
// router.delete("/:id", remove);

export default router;
