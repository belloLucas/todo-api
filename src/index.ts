import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express (TS) server");
});

app.use("/", todoRouter);

app.use("/", todoRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
