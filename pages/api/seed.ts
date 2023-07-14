import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "@/database";
import { Entry } from "@/models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "This service cannot access to prod" });
  }

  await db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  // await Entry.create(seedData.entries[0]);

  await db.disconnect();

  res.status(200).json({ message: "Proccess has finished successfully" });
}