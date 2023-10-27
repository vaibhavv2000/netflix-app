import { Request, Router, Response, NextFunction as NF } from "express";

const router = Router();

router.post("/addtolist", async (req: Request, res: Response, next: NF) => {
  const { email, movie } = req.body;

  try {
    // const 
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
