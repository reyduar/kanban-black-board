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
    case "POST":
      return loginUser(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body;
  await db.connect();

  const user = await User.findOne({ email });
  await db.disconnect();
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const { _id, name, role } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      _id,
      email,
      name,
      role,
    },
  });
}
