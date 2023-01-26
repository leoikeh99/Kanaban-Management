import { array, boolean, object, string } from "yup";

export const BoardSchema = object({
  name: string().min(2).required(),
  status: array(object({ name: string().min(2).required() })),
});

export const EditBoardSchema = object({
  name: string().min(2).required(),
  status: array(
    object({
      name: string().min(2).required(),
      id: string().min(1).required(),
      new: boolean(),
      edited: boolean(),
      deleted: boolean(),
    })
  ),
});

export const DeleteBoardSchema = object({
  boardId: string().min(2).required(),
});
