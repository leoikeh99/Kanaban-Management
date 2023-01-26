import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as AuthDetails;
        let checkPass = false;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          checkPass = await bcrypt.compare(password, user.password);
        }

        if (user && checkPass) {
          await prisma.$disconnect();
          return { ...user, name: user.username };
        } else {
          await prisma.$disconnect();
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
