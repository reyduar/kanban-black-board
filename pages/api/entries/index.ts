import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEnabledCategories(res);

    default:
      return res.status(400).json({ message: "Endpoint not found" });
  }
}
async function getEnabledCategories(res: NextApiResponse<Data>) {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  return res.status(200).json(entries);
}
