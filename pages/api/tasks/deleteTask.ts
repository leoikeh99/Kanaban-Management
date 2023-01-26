import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { DeleteTaskSchema } from "schemas/taskSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;
  let { taskId } = req.body.data;

  try {
    const checkTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        status: {
          board: {
            userId,
          },
        },
      },
    });
    if (!checkTask) {
      return res.status(400).json({ message: "Invalid task" });
    }

    //delete task
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    //decrement tasks with lower rank
    await prisma.task.updateMany({
      where: {
        status: {
          id: checkTask.statusId,
        },
        rank: {
          gt: checkTask.rank,
        },
      },
      data: {
        rank: {
          decrement: 1,
        },
      },
    });
    res.json({ message: "Task successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(DeleteTaskSchema, handler), "DELETE");
