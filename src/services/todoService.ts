import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.URL;
const dbKey = process.env.KEY;

const supabase = createClient(`${dbURL}`, `${dbKey}`);

export default async function getTasks(req: Request, res: Response) {
  const { data: tasks } = await supabase.from("tb_tasks").select();
  if (tasks && tasks.length > 0) {
    return res.status(201).send(tasks);
  }
  return res.status(404).json({ msg: "Não foram encontradas tarefas salvas" });
}

export async function createTask(req: Request, res: Response) {
  const { title, description, color, favorite } = req.body;

  if (!title)
    return res.status(400).json({ msg: "O título precisa ser preenchido" });
  if (!description)
    return res.status(400).json({ msg: "A descrição precisa ser preenchida" });
  if (!color)
    return res.status(400).json({ msg: "A cor precisa ser preenchida" });
  if (!favorite)
    return res.status(400).json({ msg: "Defina se é uma favorita" });

  const { error } = await supabase.from("tb_tasks").insert({
    title: title,
    description: description,
    color: color,
    favorite: favorite,
  });
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).send();
}

export async function updateTask(req: Request, res: Response) {
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
      .status(400)
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
      return res.status(400).json({
        msg: "Houve um erro na atualização da tarefa. Tente novamente.",
      });
    }
    return res.status(201).json(updatedTask);
  }
  return res.status(404).json({ msg: "Tarefa não encontrada." });
}

export async function deleteTask(req: Request, res: Response) {
  const taskId = req.params.id;

  const { data: task } = await supabase
    .from("tb_tasks")
    .select()
    .eq("id", taskId);

  if (task && task.length > 0) {
    console.log(task);
    await supabase.from("tb_tasks").delete().eq("id", taskId);
    return res.status(200).json({ msg: "Tarefa excluída com sucesso" });
  }

  return res.status(404).json({ msg: "Tarefa não encontrada." });
}
