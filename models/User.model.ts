import { User } from "@/auth/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends User {}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} does role valid.",
        default: "client",
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
