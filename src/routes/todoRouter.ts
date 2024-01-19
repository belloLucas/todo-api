import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const dbURL = process.env.URL;
const dbKey = process.env.KEY;

const supabase = createClient(`${dbURL}`, `${dbKey}`);

router.get(
  "/tasks",
  async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    const { data, error } = await supabase.from("tb_tasks").select();
    if (error) {
      return res.status(404).send(error);
    }
    return res.status(201).send(data);
  }
);

router.post("/tasks", async (req: Request, res: Response) => {
  const { title, description, color, favorite } = req.body;

  if (!title)
    return res.status(404).json({ msg: "O título precisa ser preenchido" });
  if (!description)
    return res.status(404).json({ msg: "A descrição precisa ser preenchida" });
  if (!color)
    return res.status(404).json({ msg: "A cor precisa ser preenchida" });
  if (!favorite)
    return res.status(404).json({ msg: "Defina se é uma favorita" });

  const { error } = await supabase.from("tb_tasks").insert({
    title: title,
    description: description,
    color: color,
    favorite: favorite,
  });
  if (error) {
    return res.status(404).json({ error });
  }
  return res.status(201).json({ msg: "created" });
});

export default router;
