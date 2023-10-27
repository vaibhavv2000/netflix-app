import {NextFunction as NF,Request,Response,Router} from "express";
import redis from "../config/redis";

const router: Router = Router();

router.post("/register",async (req: Request,res: Response,next: NF) => {
  const {email,password,name} = req.body;

  if(!name || !email || !password)
    return res.status(400).json({message: "All fields are required"});

  try {
    const get_email = await redis.hGetAll(email);

    if(get_email.name) {
      return res.status(400).json({message: "Email already exists"});
    }

    await redis.hSet(email,["name",name]);
    await redis.hSet(email,["password",password]);

    return res.status(201).json({message: "Registered"});
  } catch(error) {
    next(error);
  }
});

router.post("/login",async (req: Request,res: Response,next: NF) => {
  const {email,password} = req.body;

  if(!email || !password)
    return res.status(400).json({message: "All fields are necessary"});

  try {
    const get_email = await redis.hGetAll(email);

    if(!get_email.name) {
      return res.status(400).json({message: "email doesn't exist"});
    }

    if(password !== get_email.password) {
      return res.status(400).json({message: "Wrong PWD"});
    }

    return res.status(200).json({message: "Logged In",name: get_email.name});
  } catch(error) {
    next(error);
  }
});

router.delete("/deleteuser",async (req: Request,res: Response,next: NF) => {
  const {email} = req.body;

  try {
    await redis.del(email);

    return res.status(200).json({error: "Account Deleted"});
  } catch(error) {
    next(error);
  }
});

export {router as AuthRouter};
