import { Dispatch, SetStateAction, useState } from "react";
import { Plus } from "lucide-react";

import AddTaskTodo from "./AddTaskTodo";

export const AddTask = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  return showAddTask ? (
    <AddTaskTodo setShowAddTask={setShowAddTask} />
  ) : (
    <AddTaskBtn onClick={() => setShowAddTask(true)} />
  );
};

export default function AddTaskBtn({
  onClick,
}: {
  onClick: Dispatch<SetStateAction<any>>;
}) {
  return (
    <button className="pl-2 mt-2 flex flex-1" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center justify-center gap-2 ">
          <Plus className="w-4 h-4 text-primary hover:bg-primary hover:rounded-xl hover:text-white" />
          <p className="text-sm tracking-tight text-foreground/70">
            투두 등록하기
          </p>
        </div>
      </div>
    </button>
  );
}
