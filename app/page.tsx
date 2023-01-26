import { unstable_getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import InitialPage from "./InitialPage";

export default async function Home() {
  const session = await unstable_getServerSession();
  let board;

  if (session?.user?.email) {
    prisma.board.create;
    board = await prisma.board.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        Status: {
          include: {
            Task: {
              include: {
                subtask: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  return (
    <>
      {/* @ts-ignore */}
      <InitialPage
        board={board && JSON.parse(JSON.stringify(board))}
        session={session}
      />
    </>
  );
}
