import { db } from "@/database";
import { User, IUser } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { validations } from "@/utils";
import UserModel from "@/models/User.model";
import { eq } from "lodash";

type Data = { message: string } | IUser[] | IUser;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(res);
    case "POST":
      return postUser(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}
async function getUsers(res: NextApiResponse<Data>) {
  await db.connect();

  const users = await User.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  return res.status(200).json(users);
}
async function postUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, email, password, repeatedPassword } = req.body;

  if (!eq(password, repeatedPassword)) {
    return res
      .status(400)
      .json({ message: "The password confirmation does not match." });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: "Name must be greater than 2 characters." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be greater than 6 characters." });
  }

  await db.connect();
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "This email already has used" });
  }

  const newUser = new UserModel({
    name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
  });

  try {
    await newUser.save();
    await db.disconnect();
    return res.status(201).json(newUser);
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: `Error creating User: ${error}` });
  }
}
