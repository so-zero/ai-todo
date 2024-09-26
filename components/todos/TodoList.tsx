"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import Todos from "./Todos";
import CompletedTodos from "./CompletedTodos";
import { AddTask } from "./AddTaskBtn";

export default function TodoList() {
  const todos = useQuery(api.todos.get) ?? [];
  const completedTodos = useQuery(api.todos.completedTodos) ?? [];
  const inCompletedTodos = useQuery(api.todos.inCompletedTodos) ?? [];
  const totalTodos = useQuery(api.todos.totalTodos) ?? 0;

  if (
    todos === undefined ||
    completedTodos === undefined ||
    inCompletedTodos === undefined
  ) {
    <p>로딩중..</p>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">대시보드</h1>
      </div>

      <div className="flex flex-col gap-1 py-4">
        <Todos todo={inCompletedTodos} />
      </div>

      <AddTask />

      <div className="flex flex-col gap-1 py-4">
        <Todos todo={completedTodos} />
      </div>

      <CompletedTodos totalTodos={totalTodos} />
    </div>
  );
}
