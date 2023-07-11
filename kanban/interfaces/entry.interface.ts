export type EntryStatus = "pending" | "in-progress" | "finished";

export interface Entry {
  _id: string;
  name: string;
  descriptions: Description[];
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
  subtasks: Description[];
}

export interface Description {
  _id: string;
  description: string;
}
