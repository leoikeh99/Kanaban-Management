import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { EditBoardSchema } from "schemas/boardSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;
  let { name, status } = req.body.data;
  let boardId = req.query.id;

  if (Array.isArray(boardId)) {
    boardId = boardId.join("");
  }

  status = status ? status : [];

  try {
    const checkBoard = await prisma.board.findFirst({
      where: {
        userId,
        id: boardId,
      },
    });
    if (!checkBoard) {
      return res.status(400).json({ message: "Invalid board" });
    }

    // if user removed any statuses
    if (status.some((val: { deleted: boolean }) => val.deleted)) {
      const deleteStatuses = status
        .filter((val: { deleted?: boolean }) => val.deleted)
        .map(async (val: { id: string }) => {
          await prisma.status.delete({
            where: {
              id: val.id,
            },
          });
        });

      await Promise.all(deleteStatuses);
    }

    const board = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name,
        Status: {
          createMany: {
            data: status
              .filter((val: { new?: boolean }) => val.new)
              .map((val: { name: string }) => {
                return {
                  name: val.name,
                };
              }),
          },
          update: status
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
        Status: {
          orderBy: { order: "asc" },
          include: {
            Task: {
              include: {
                subtask: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ message: "Updated Successfully", board });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(EditBoardSchema, handler), "PUT");
