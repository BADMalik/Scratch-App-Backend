import { Router } from "express";
import usersRouter from "./userRoute.js";
const router = Router();

router.use("/users", usersRouter);

export default router;
