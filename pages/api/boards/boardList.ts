import prisma from "@/lib/prisma";
import Authenticate from "middleware/authenticate";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* @ts-ignore */
  const userId = req.userId;

  const boardList = await prisma.board.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  res.status(200).json({ boardList });
}

export default Authenticate(handler, "GET");
