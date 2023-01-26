import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { ToggleSubtaskSchema } from "schemas/taskSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;
  let { taskId, subtaskId } = req.body.data;

  try {
    const checkSubtask = await prisma.subtask.findFirst({
      where: {
        id: subtaskId,
        task: {
          id: taskId,
          status: {
            board: {
              userId,
            },
          },
        },
      },
    });
    if (!checkSubtask) {
      return res.status(400).json({ message: "Invalid Subtask" });
    }

    const subtask = await prisma.subtask.update({
      where: {
        id: checkSubtask.id,
      },
      data: {
        completed: !checkSubtask.completed,
      },
    });

    res.json({ message: "Success", subtask });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(ToggleSubtaskSchema, handler), "PUT");
