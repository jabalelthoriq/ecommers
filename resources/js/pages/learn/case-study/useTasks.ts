import { useEffect, useMemo, useState } from "react";
import { readJson, writeJson } from "./storage";
import { createId, type Task, type TaskFilter } from "./taskTypes";

const STORAGE_KEY = "belajar-react.tasks.v1";

type UseTasks = {
  tasks: Task[];
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  visibleTasks: Task[];
  stats: { total: number; done: number; active: number };
  addTask: (title: string, priority: Task["priority"]) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearDone: () => void;
};

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>(() =>
    readJson<Task[]>(STORAGE_KEY, []),
  );
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    writeJson(STORAGE_KEY, tasks);
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.done);
      case "done":
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const active = total - done;
    return { total, done, active };
  }, [tasks]);

  function addTask(title: string, priority: Task["priority"]) {
    const trimmed = title.trim();
    if (trimmed.length < 3) return;
    const task: Task = {
      id: createId(),
      title: trimmed,
      done: false,
      createdAt: Date.now(),
      priority,
    };
    setTasks((prev) => [task, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  return {
    tasks,
    filter,
    setFilter,
    visibleTasks,
    stats,
    addTask,
    toggleTask,
    removeTask,
    clearDone,
  };
}
