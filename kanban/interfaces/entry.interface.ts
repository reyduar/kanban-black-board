export type EntryStatus = "pending" | "in-progress" | "finished";

export interface Entry {
  _id: string;
  name: string;
  description: string;
  subtasks: Subtasks[];
  createdAt: number;
  status: EntryStatus;
  label?: string;
}

export interface EntryListProps {
  title: string;
  status: EntryStatus;
}

export interface EntryCardProps {
  content: Entry;
}

export interface SubtasksProps {
  subtasks: Subtasks[];
}

export interface Subtasks {
  _id: string;
  description: string;
}
