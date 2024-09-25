"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import TodoTask from "./TodoTask";

export default function TodoList() {
  const todos = useQuery(api.todos.get) ?? [];

  if (todos === undefined) {
    <p>로딩중..</p>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">대시보드</h1>
      </div>

      <div className="flex flex-col gap-1 py-4">
        {todos.map((task) => (
          <TodoTask {...task} key={task._id} />
        ))}
      </div>
    </div>
  );
}
