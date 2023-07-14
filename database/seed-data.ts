import { v4 as uuid } from "uuid";
import { Subtasks } from "@/kanban/interfaces";

interface SeedEntry {
  name: string;
  description: string;
  subtasks: any[];
  createdAt: number;
  status: string;
  label: string;
}

interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      name: "Task 1",
      description:
        "UI ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.",
      subtasks: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 2" },
        { _id: uuid(), description: "Subtask 3" },
      ],
      createdAt: Date.now(),
      status: "pending",
      label: "UI",
    },
    {
      name: "Task 2",
      description:
        "Backend ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.",
      subtasks: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 2" },
        { _id: uuid(), description: "Subtask 3" },
      ],
      createdAt: Date.now() - 1000000,
      status: "in-progress",
      label: "Backend",
    },
    {
      name: "Task 3",
      description:
        "Design ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.",
      subtasks: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 2" },
        { _id: uuid(), description: "Subtask 3" },
      ],
      createdAt: Date.now() - 1000000,
      status: "finished",
      label: "Design",
    },
  ],
};
