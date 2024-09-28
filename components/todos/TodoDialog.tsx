import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { format } from "date-fns";

import { Calendar, ChevronDown, Flag, Hash } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import TodoTask from "./TodoTask";
import { AddTask } from "./AddTaskBtn";

export default function TodoDialog({ data }: { data: Doc<"todos"> }) {
  const { taskName, description, projectId, dueDate, priority, _id } = data;

  const project = useQuery(api.projects.getProjectId, { projectId });

  const completedSubTodos = useQuery(api.subTodos.completedSubTodos) ?? [];
  const inCompletedSubTodos = useQuery(api.subTodos.inCompletedSubTodos) ?? [];

  const checkSubTodo = useMutation(api.subTodos.checkSubTodo);
  const unCheckSubTodo = useMutation(api.subTodos.unCheckSubTodo);

  const [todoDetails, setTodoDetails] = useState([]);

  useEffect(() => {
    const data = [
      {
        labelName: "프로젝트",
        value: project?.name,
        icon: <Hash className="w-3 h-3 text-primary capitalize" />,
      },
      {
        labelName: "날짜",
        value: format(dueDate, "MMM dd yyyy"),
        icon: <Calendar className="w-3 h-3 text-primary" />,
      },
      {
        labelName: "중요도",
        value: priority,
        icon: <Flag className="w-3 h-3 text-primary" />,
      },
    ];
    setTodoDetails(data);
  }, [project?.name, dueDate, priority]);

  return (
    <DialogContent className="max-w-4xl flex flex-col">
      <div className="flex justify-between items-center text-xs">
        {todoDetails.map(({ labelName, value, icon }, index) => (
          <div key={`${value}-${index}`} className="p-4 w-full border-b">
            <p className="text-foreground/70">{labelName}</p>
            <div className="flex items-center gap-2">
              {icon}
              <span>{value}</span>
            </div>
          </div>
        ))}
      </div>
      <DialogHeader>
        <DialogTitle>{taskName}</DialogTitle>
        <DialogDescription>
          <p className="my-2">{description}</p>
          <div className="flex items-center gap-1 mt-12 border-b border-gray-100 pb-2 flex-wrap justify-between lg:gap-0">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="font-bold flex text-sm text-gray-900">
                서브 투두리스트
              </p>
            </div>
            <div>
              <Button variant="outline">AI 추천🤖</Button>
            </div>
          </div>
          <div className="pl-4">
            {inCompletedSubTodos.map((task) => {
              return (
                <TodoTask
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() => checkSubTodo({ taskId: task._id })}
                />
              );
            })}
            <div className="py-4">
              <AddTask parentTask={data} />
            </div>
            {completedSubTodos.map((task) => {
              return (
                <TodoTask
                  key={task._id}
                  data={task}
                  isCompleted={task.isCompleted}
                  handleOnChange={() => unCheckSubTodo({ taskId: task._id })}
                />
              );
            })}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
