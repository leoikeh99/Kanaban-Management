import { object, string } from "yup";

export const RegisterSchema = object({
  username: string().min(2).required(),
  email: string().email().required(),
  password: string().min(6).required(),
});

export const LoginSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});
