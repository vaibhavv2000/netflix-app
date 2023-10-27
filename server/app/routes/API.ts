import { Router } from "express";
import { AuthRouter } from "./AuthRoutes";
import { userRouter } from "./userRoutes";
import { movieRouter } from "./movieRoutes";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", userRouter);
router.use("/movie", movieRouter);

export { router as API };
