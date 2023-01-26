import { array, boolean, number, object, string } from "yup";

export const AddTaskSchema = object({
  title: string().min(2).required(),
  description: string(),
  statusId: string().min(2).required(),
  subtasks: array(object({ name: string().min(2).required() })),
});

export const EditTaskSchema = object({
  title: string().min(2).required(),
  description: string(),
  statusId: string().min(2).required(),
  rank: number().min(1).required(),
  subtasks: array(
    object({
      name: string().min(2).required(),
      id: string().min(2).required(),
      new: boolean(),
      edited: boolean(),
      deleted: boolean(),
    })
  ),
});

export const ToggleSubtaskSchema = object({
  taskId: string().min(2).required(),
  subtaskId: string().min(2).required(),
});

export const DeleteTaskSchema = object({
  taskId: string().min(2).required(),
});

export const DropTaskSchema = object({
  initTaskId: string().min(2).required(),
  destinationTaskId: string(),
  bottomStatusId: string(),
});
