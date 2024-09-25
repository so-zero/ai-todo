import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";

export default function TodoTask({ taskName, _id, isCompleted }) {
  return (
    <div
      key={_id}
      className="flex items-center space-x-0 p-2 border-b border-gray-100 animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 justify-end items-center w-full">
          <div className="flex gap-2 w-full items-center">
            <Checkbox
              id="todo"
              checked={isCompleted}
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
        </div>
      </Dialog>
    </div>
  );
}
