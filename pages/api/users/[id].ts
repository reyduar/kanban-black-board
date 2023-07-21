import { db } from "@/database";
import { User, IUser } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IUser[] | IUser;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  switch (req.method) {
    case "GET":
      return getUserById(req, res);
    case "PUT":
      return updateUser(req, res);
    case "DELETE":
      return deleteUser(req, res);

    default:
      res.status(400).json({ message: "Invalid method" });
  }
}
async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  await db.connect();

  const userToUpdate = await User.findById(id);

  if (!userToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Id not found" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updatedUser!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}
async function getUserById(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  await db.connect();

  try {
    const user = await User.findById({ _id: id });
    await db.disconnect();
    return res.status(200).json(user!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}
async function deleteUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  await db.connect();

  try {
    const user = await User.findOneAndDelete({ _id: id });
    await db.disconnect();
    return res.status(200).json(user!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}
