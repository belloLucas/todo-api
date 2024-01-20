import { Router, Request, Response } from "express";
import getTasks, {
  createTask,
  updateTask,
  deleteTask,
} from "../services/todoService";

const router = Router();

router.get(
  "/tasks",
  async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => getTasks(req, res)
);

router.post("/tasks", async (req: Request, res: Response) =>
  createTask(req, res)
);

router.patch("/tasks/:id", async (req: Request, res: Response) =>
  updateTask(req, res)
);

router.delete("/tasks/:id", async (req: Request, res: Response) =>
  deleteTask(req, res)
);

export default router;
