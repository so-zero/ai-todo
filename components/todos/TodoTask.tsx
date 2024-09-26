import { Doc } from "@/convex/_generated/dataModel";
import clsx from "clsx";
import TodoDialog from "./TodoDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function TodoTask({
  data,
  isCompleted,
  handleOnChange,
}: {
  data: Doc<"todos">;
  isCompleted: boolean;
  handleOnChange: any;
}) {
  const { taskName } = data;
  return (
    <div
      key={data._id}
      className="flex items-center space-x-0 p-2 border-b border-gray-100 animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 justify-end items-center w-full">
          <div className="flex gap-2 w-full items-center">
            <Checkbox
              id="todo"
              checked={isCompleted}
              onCheckedChange={handleOnChange}
              className={clsx(
                "w-4 h-4",
                isCompleted &&
                  "data-[state=checked]:bg-gray-300 border-gray-300"
              )}
            />
            <DialogTrigger asChild>
              <div className="flex flex-col items-start">
                <button
                  className={clsx(
                    "text-sm font-normal text-left",
                    isCompleted && "line-through text-foreground/30"
                  )}
                >
                  {taskName}
                </button>
              </div>
            </DialogTrigger>
          </div>
          <TodoDialog data={data} />
        </div>
      </Dialog>
    </div>
  );
}
