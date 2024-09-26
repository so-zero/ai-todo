import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import TodoTask from "./TodoTask";

export default function Todos({ todo }: { todo: Array<Doc<"todos">> }) {
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

  return todo.map((task: Doc<"todos">) => (
    <TodoTask
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
}
