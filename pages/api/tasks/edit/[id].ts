import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { EditTaskSchema } from "schemas/taskSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;
  let { title, description, statusId, subtasks } = req.body.data;
  let taskId = req.query.id;

  if (Array.isArray(taskId)) {
    taskId = taskId.join("");
  }

  subtasks = subtasks ? subtasks : [];
  description = description ? description.toString() : "";

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
      return res.status(400).json({ message: "Invalid Task" });
    }

    if (checkTask.statusId !== statusId) {
      //update ranks of tasks below the task
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
    }

    const checkStatus = await prisma.status.findFirst({
      where: {
        id: statusId,
        board: {
          userId,
        },
      },
      include: {
        Task: true,
      },
    });
    if (!checkStatus) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    let rank = checkTask.rank;

    if (checkTask.statusId !== checkStatus.id)
      rank = checkStatus.Task.length + 1;

    // if user removed any subtasks
    if (subtasks.some((val: { deleted: boolean }) => val.deleted)) {
      const deleteSubtasks = subtasks
        .filter((val: { deleted?: boolean }) => val.deleted)
        .map(async (val: { id: string }) => {
          await prisma.subtask.delete({
            where: {
              id: val.id,
            },
          });
        });

      await Promise.all(deleteSubtasks);
    }

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        statusId,
        rank,
        subtask: {
          createMany: {
            data: subtasks
              .filter((val: { new?: boolean }) => val.new)
              .map((val: { name: string }) => {
                return {
                  name: val.name,
                };
              }),
          },
          update: subtasks
            .filter(
              (val: { edited?: boolean; new?: boolean }) =>
                val.edited && !val.new
            )
            .map((val: { name: string; id: string }) => {
              return {
                where: { id: val.id },
                data: { name: val.name },
              };
            }),
        },
      },
      include: {
        subtask: true,
      },
    });

    const status = await prisma.status.findMany({
      where: {
        board: {
          id: checkStatus.boardId,
        },
      },
      include: {
        Task: {
          include: {
            subtask: true,
          },
          orderBy: {
            rank: "asc",
          },
        },
      },
    });

    res.status(200).json({ message: "Updated Successfully", task, status });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(EditTaskSchema, handler), "PUT");
