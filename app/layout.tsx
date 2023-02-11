import "./globalStyles.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Providers from "./providers";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import ShowAuthModals from "@/components/Modals/ShowAuthModals";
import { Suspense } from "react";
import Loading from "./loading";
import { Plus_Jakarta_Sans } from "@next/font/google";

const plus_jakarta = Plus_Jakarta_Sans({
  weight: ["500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
      <body className={plus_jakarta.variable}>
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
