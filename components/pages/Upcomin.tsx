"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import moment from "moment";

import Todos from "../todos/Todos";
import { AddTask } from "../todos/AddTaskBtn";
import { Clock3, ClockAlert, Dot } from "lucide-react";

export default function Upcoming() {
  const lastTodos = useQuery(api.todos.lastTodos) ?? [];
  const upcomingTodos = useQuery(api.todos.upcomingTodos) ?? [];

  if (lastTodos === undefined || upcomingTodos === undefined) {
    <p>로딩중..</p>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">다음</h1>
      </div>

      <div className="flex flex-col gap-1 py-4 text-primary/80">
        <div className="flex items-center gap-2 mb-2">
          <ClockAlert className="w-4 h-4" />
          <p className="font-bold text-sm">지난 일정</p>
        </div>
        <Todos todo={lastTodos} />
      </div>

      <AddTask />

      <div className="flex flex-col gap-1 py-4 text-primary mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Clock3 className="w-4 h-4" />
          <p className="font-bold text-sm">다음 일정</p>
        </div>

        {Object.keys(upcomingTodos || {}).map((dueDate) => {
          return (
            <div key={dueDate} className="mb-3">
              <p className="font-bold flex text-sm items-center gap-1">
                <Dot />
                {moment(dueDate).format("YYYY년 MM월 DD일")}
              </p>
              <ul>
                <Todos todo={upcomingTodos[dueDate]} />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
