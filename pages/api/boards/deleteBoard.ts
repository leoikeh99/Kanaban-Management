import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { DeleteBoardSchema } from "schemas/boardSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;
  let { boardId } = req.body.data;

  try {
    const checkBoard = await prisma.board.findFirst({
      where: {
        id: boardId,
        userId,
      },
    });
    if (!checkBoard) {
      return res.status(400).json({ message: "Invalid board" });
    }

    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    res.json({ message: "Board successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(DeleteBoardSchema, handler), "DELETE");
