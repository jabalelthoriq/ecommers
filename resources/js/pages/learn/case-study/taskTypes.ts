export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  priority: "low" | "medium" | "high";
};

export type TaskFilter = "all" | "active" | "done";

export function createId() {
  return Math.random().toString(16).slice(2);
}
