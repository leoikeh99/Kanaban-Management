import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { OptionalObjectSchema, ObjectShape } from "yup/lib/object";

function validate(schema: OptionalObjectSchema<ObjectShape>, next: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      !(
        req.method === "POST" ||
        req.method === "PUT" ||
        req.method === "DELETE"
      )
    ) {
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }
    try {
      await schema.validate(req.body.data);
    } catch (error: any) {
      return res.status(400).json({ message: error.errors[0] });
    }

    await next(req, res);
  };
}

export default validate;
