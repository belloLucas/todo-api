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

router.patch("/tasks/:id", async (req: Request, res: Response) => {
  const { title, description, color, favorite } = req.body;
  const taskId = req.params.id;

  if (Object.keys(req.body).length <= 0) {
    return res.status(400).json({ msg: "Altere pelo menos um campo" });
  }

  const { data: task, error } = await supabase
    .from("tb_tasks")
    .select()
    .eq("id", taskId);
  if (error) {
    return res
      .status(404)
      .json({ msg: "Houve um erro ao buscar a tarefa. Tente novamente." });
  }

  if (task && task.length > 0) {
    const { data: updatedTask, error: updateError } = await supabase
      .from("tb_tasks")
      .update({
        title,
        description,
        color,
        favorite,
      })
      .eq("id", taskId);

    if (updateError) {
      return res.status(404).json({
        msg: "Houve um erro na atualização da tarefa. Tente novamente.",
      });
    }
    return res.status(200).json(updatedTask);
  }
  return res.status(404).json({ msg: "Tarefa não encontrada." });
});

router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const { data: error } = await supabase
    .from("tb_tasks")
    .select()
    .eq("id", taskId);

  if (error) {
    return res.status(400).json({ msg: "Tarefa não encontrada." });
  }

  if (!error) {
    await supabase.from("tb_tasks").delete().eq("id", taskId);
    return res.status(200).json({ msg: "Tarefa excluída com sucesso" });
  }

  return res.status(400).json({ msg: "Ocorreu um erro. Tente novamente" });
});

export default router;
