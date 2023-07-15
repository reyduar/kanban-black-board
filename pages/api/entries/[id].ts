import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

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
      return getEntryById(req, res);
    case "PUT":
      return updateEntry(req, res);

    default:
      res.status(400).json({ message: "Invalid method" });
  }
}
async function updateEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Id not found" });
  }

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}
async function getEntryById(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  await db.connect();

  try {
    const entry = await Entry.findById({ _id: id });
    await db.disconnect();
    return res.status(200).json(entry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}
