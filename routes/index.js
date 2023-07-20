import { Router } from "express";
import usersRouter from "./userRoute.js";
const router = Router();

/**
 * Singular Point for all controller routes registration
 */
router.use("/users", usersRouter);

export default router;
