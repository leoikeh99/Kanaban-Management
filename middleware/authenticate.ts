import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function Authenticate(next: Function, method: string) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.setHeader("Allow", [method]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }

    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      if (!req.body.data) {
        return res
          .status(400)
          .json({ message: `'data' object required in [POST, PUT] requests` });
      }
    }

    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return res.status(403).json({ message: "Unauthenticated" });
    }

    /* @ts-ignore */
    req.userId = user.id;

    await next(req, res);
  };
}
