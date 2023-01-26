import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { AddTaskSchema } from "schemas/taskSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { data } = req.body;
  /* @ts-ignore */
  const userId = req.userId;
  let subtasks = data.subtasks ? data.subtasks : [];
  let description = data.description ? data.description.toString() : "";

  const checkStatus = await prisma.status.findFirst({
    where: {
      id: data.statusId,
      board: {
        userId,
      },
    },
  });
  if (!checkStatus) {
    return res.status(400).json({ message: "Invalid Status" });
  }

  let lastTask = await prisma.task.findFirst({
    where: { statusId: data.statusId },
  });
  let lastTaskRank = lastTask ? lastTask.rank : 1;

  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description,
        statusId: data.statusId,
        rank: lastTaskRank + 1,
        subtask: {
          createMany: {
            data: subtasks.map((val: { name: string }) => {
              return { name: val.name };
            }),
          },
        },
      },
      include: {
        subtask: true,
      },
    });

    res.json({ message: "Success", task });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(AddTaskSchema, handler), "POST");
