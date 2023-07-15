import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import EntryModel from "@/models/Entry.model";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}
async function getEntries(res: NextApiResponse<Data>) {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  return res.status(200).json(entries);
}
async function postEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, description, subtasks, label } = req.body;
  const createdAt = Date.now();
  const newEntry = new EntryModel({
    name,
    description,
    createdAt,
    subtasks,
    label,
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: `Error creating entry: ${error}` });
  }
}
