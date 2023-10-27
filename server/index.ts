import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { API } from "./app/routes/API";

const app: Application = express();

app.use(express.json());

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use("/api", API);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  res.status(500).json(err.message);
});

app.listen(8000, () => console.log(`Server running at 8000`));
