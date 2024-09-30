"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import Sidebar from "@/components/nav/Sidebar";
import Mobilebar from "@/components/nav/Mobilebar";
import Todos from "@/components/todos/Todos";
import { Hash } from "lucide-react";
import { AddTask } from "@/components/todos/AddTaskBtn";
import CompletedTodos from "@/components/todos/CompletedTodos";
import AiTodoTask from "@/components/todos/AiTodoTask";

export default function ProjectIdPage() {
  const { projectId } = useParams<{ projectId: Id<"projects"> }>();

  const inCompletedTodos =
    useQuery(api.todos.getInCompletedTodos, {
      projectId,
    }) ?? [];
  const completedTodos =
    useQuery(api.todos.getCompletedTodos, {
      projectId,
    }) ?? [];
  const totalProject = useQuery(api.todos.getTotalProjectId, {
    projectId,
  });

  const project = useQuery(api.projects.getProjectId, {
    projectId,
  });
  const projectName = project?.name || "";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Mobilebar navTitle={"프로젝트"} navLink="/dashboard/projects" />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Hash className="w-4 h-4" />
              <h1 className="text-lg font-semibold md:text-2xl">
                {projectName}
              </h1>
            </div>
            <div>
              <AiTodoTask projectId={projectId} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <Todos todo={inCompletedTodos} />
            <div className="pt-2 pb-4">
              <AddTask projectId={projectId} />
            </div>
            <Todos todo={completedTodos} />
          </div>
          <div className="flex items-center space-x-4 gap-2 text-sm text-foreground/80">
            <CompletedTodos totalTodos={totalProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
