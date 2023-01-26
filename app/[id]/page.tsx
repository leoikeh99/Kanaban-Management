import prisma from "@/lib/prisma";
import React from "react";
import Board from "./Board";
import { unstable_getServerSession } from "next-auth/next";
import Loading from "app/loading";

export default async function BoardPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await unstable_getServerSession();
  let board;

  if (session?.user?.email) {
    board = await prisma.board.findMany({
      where: {
        id: params.id,
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
              orderBy: {
                rank: "asc",
              },
            },
          },
        },
      },
    });
  }

  if (!board || (board && board.length === 0)) throw new Error("Invalid Board");

  return (
    <>
      {/* @ts-ignore */}
      <Board board={JSON.parse(JSON.stringify(board[0]))} />
    </>
  );
}
