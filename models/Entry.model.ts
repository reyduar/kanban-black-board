import { Entry } from "@/kanban/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  subtasks: [
    {
      _id: { type: String },
      description: { type: String },
    },
  ],
  createdAt: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} does not allow.",
    },
    default: "pending",
  },
  label: { type: String, required: false },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
