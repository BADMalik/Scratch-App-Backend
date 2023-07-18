import { Router } from "express";
import {
  getUser as get,
  createUser as create,
  updateUser as update,
  deleteUser as remove,
} from "../controllers/userController/index.js";

const router = Router();

/* GET programming languages. */
router.get("/", get);

router.get("/:id", get);

/* POST programming language */
router.post("/", create);

/* PUT programming language */
router.put("/:id", update);

/* DELETE programming language */
router.delete("/:id", remove);

export default router;
