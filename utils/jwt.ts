import jwt from "jsonwebtoken";
import { JWT_SECRET_SEED } from "@/config";

export const signToken = (_id: string, email: string) => {
  if (!JWT_SECRET_SEED) {
    throw new Error("No secret seed provided for token generation");
  }

  return jwt.sign({ _id, email }, JWT_SECRET_SEED, { expiresIn: "300d" });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!JWT_SECRET_SEED) {
    throw new Error("No secret seed provided for token generation");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("Invalid JWT.");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject("Valid JWT.");
    }
  });
};
