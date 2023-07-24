import { Router } from "express";
import privateUserRouter from "./private/userRoute.js";
import publicUserRouter from "./public/userRoute.js";

const router = Router();
const privateRouter = Router();

/**
 * Singular Point for all public controller routes registration
 */
privateRouter.use("/users", privateUserRouter);

/**
 * Singular Point for all private controller routes registration
 */
router.use("/users", publicUserRouter);

export { router, privateRouter };
