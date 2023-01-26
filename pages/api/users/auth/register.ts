import type { NextApiRequest, NextApiResponse } from "next";
import { RegisterSchema } from "schemas/authSchemas";
import validate from "middleware/validate";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { validateEmail } from "app/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { username, email, password }: RegDetails = req.body.data;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  try {
    const checkUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (checkUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    await prisma.$disconnect();
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export default validate(RegisterSchema, handler);
