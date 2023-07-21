import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/database";
import { User } from "@/models";
import { jwt } from "@/utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: { _id: string; email: string; name: string; role: string };
    };

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return validateJwt(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

async function validateJwt(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { kbtoken = "" } = req.cookies;
  let userId = "";

  try {
    userId = await jwt.isValidToken(kbtoken!);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "User id not found." });
  }

  const { _id, email, role, name } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      _id,
      email,
      role,
      name,
    },
  });
}
