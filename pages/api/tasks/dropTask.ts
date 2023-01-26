import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { DropTaskSchema } from "schemas/taskSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let {
    data: { initTaskId, destinationTaskId, bottomStatusId },
  } = req.body;
  /* @ts-ignore */
  const userId = req.userId;

  const initTask = await prisma.task.findFirst({
    where: {
      id: initTaskId,
      status: {
        board: { userId },
      },
    },
  });
  if (!initTask) {
    return res.status(400).json({ message: "Invalid Initial Task" });
  }

  if (destinationTaskId) {
    const destTask = await prisma.task.findFirst({
      where: {
        id: destinationTaskId,
        status: {
          board: { userId },
        },
      },
    });
    if (!destTask) {
      return res.status(400).json({ message: "Invalid destination task" });
    }

    if (initTask.statusId === destTask.statusId) {
      await prisma.task.update({
        where: {
          id: initTask.id,
        },
        data: {
          rank: destTask.rank,
        },
      });

      await prisma.task.update({
        where: {
          id: destTask.id,
        },
        data: {
          rank: initTask.rank,
        },
      });
      return res.json({ message: "Success" });
    } else {
      await prisma.task.updateMany({
        where: {
          statusId: destTask.statusId,
          rank: {
            gte: destTask.rank,
          },
        },
        data: {
          rank: {
            increment: 1,
          },
        },
      });

      await prisma.task.update({
        where: {
          id: initTask.id,
        },
        data: {
          rank: destTask.rank,
          statusId: destTask.statusId,
        },
      });

      await prisma.task.updateMany({
        where: {
          statusId: initTask.statusId,
          rank: {
            gte: initTask.rank,
          },
        },
        data: {
          rank: {
            decrement: 1,
          },
        },
      });
      return res.json({ message: "Success" });
    }
  }

  if (bottomStatusId) {
    const status = await prisma.status.findFirst({
      where: {
        id: bottomStatusId,
      },
      include: {
        Task: {
          orderBy: {
            rank: "asc",
          },
        },
      },
    });
    if (!status) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (initTask.statusId === status.id) {
      await prisma.task.updateMany({
        where: {
          statusId: status.id,
          rank: {
            gt: initTask.rank,
          },
        },
        data: {
          rank: {
            decrement: 1,
          },
        },
      });
      await prisma.task.update({
        where: {
          id: initTask.id,
        },
        data: {
          rank: status.Task[status.Task.length - 1]
            ? status.Task[status.Task.length - 1].rank + 1
            : 1,
        },
      });
      return res.json({ message: "Success" });
    } else {
      await prisma.task.update({
        where: {
          id: initTask.id,
        },
        data: {
          rank: status.Task[status.Task.length - 1]
            ? status.Task[status.Task.length - 1].rank + 1
            : 1,
          statusId: status.id,
        },
      });
      return res.json({ message: "Success" });
    }
  }

  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(DropTaskSchema, handler), "PUT");
