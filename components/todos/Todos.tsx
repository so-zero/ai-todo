import { useMutation } from "convex/react";
import TodoTask from "./TodoTask";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";

export default function Todos({ todo }) {
  const { toast } = useToast();

  const checkTodo = useMutation(api.todos.checkTodo);
  const unCheckTodo = useMutation(api.todos.unCheckTodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckTodo({ taskId: task._id });
    } else {
      toast({
        title: "✅ Task Completed",
        description: "완료된 작업입니다.",
        duration: 3000,
      });
      checkTodo({ taskId: task._id });
    }
  };

  return todo.map((task) => (
    <TodoTask
      key={task._id}
      {...task}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
}
