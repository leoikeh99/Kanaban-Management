import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import validate from "middleware/validate";
import type { NextApiRequest, NextApiResponse } from "next";
import { BoardSchema } from "schemas/boardSchemas";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;
  /* @ts-ignore */
  const userId = req.userId;
  let statuses = data.status
    ? data.status.map((val: { name: string }) => {
        return { name: val.name };
      })
    : [];

  try {
    const checkName = await prisma.board.findFirst({
      where: {
        userId,
        name: data.name,
      },
    });
    if (checkName) {
      return res.status(400).json({ message: "Board name already exists" });
    }

    const board = await prisma.board.create({
      data: {
        name: data.name,
        userId,
        Status: {
          createMany: {
            data: statuses,
          },
        },
      },
      include: {
        Status: {
          include: {
            Task: true,
          },
        },
      },
    });

    res.json({ message: "Success", board });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(validate(BoardSchema, handler), "POST");
