import { Dispatch, SetStateAction, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Plus } from "lucide-react";

import AddTaskTodo from "./AddTaskTodo";

export const AddTask = ({
  parentTask,
  projectId,
}: {
  parentTask?: Doc<"todos">;
  projectId?: Id<"projects">;
}) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return showAddTask ? (
    <AddTaskTodo
      setShowAddTask={setShowAddTask}
      parentTask={parentTask}
      projectId={projectId}
    />
  ) : (
    <AddTaskBtn
      onClick={() => setShowAddTask(true)}
      title={parentTask?._id ? "서브투두 등록하기" : "투두 등록하기"}
    />
  );
};

export default function AddTaskBtn({
  onClick,
  title,
}: {
  onClick: Dispatch<SetStateAction<any>>;
  title: string;
}) {
  return (
    <button className="pl-2 mt-2 flex flex-1" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center justify-center gap-2 ">
          <Plus className="w-4 h-4 text-primary hover:bg-primary hover:rounded-xl hover:text-white" />
          <p className="text-sm tracking-tight text-foreground/70">{title}</p>
        </div>
      </div>
    </button>
  );
}
