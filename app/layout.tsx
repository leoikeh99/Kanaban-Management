import "./globalStyles.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Providers from "./providers";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import ShowAuthModals from "@/components/Modals/ShowAuthModals";
import { Suspense } from "react";
import Loading from "./loading";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();
  let user;
  try {
    if (session?.user?.email) {
      user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
          boards: {
            select: {
              id: true,
              name: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang="en" className="light">
      <head />
      <body>
        <Providers boards={user?.boards}>
          <Header />
          <Sidebar />
          <ShowAuthModals />
          <main>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
