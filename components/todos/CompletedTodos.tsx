import { SquareCheckBig } from "lucide-react";

export default function CompletedTodos({ totalTodos }) {
  return (
    <div className="flex items-center gap-1 p-2 text-sm text-foreground/80">
      <>
        <SquareCheckBig className="w-4 h-4" />
        <span>+ {totalTodos}</span>
        <span>완료</span>
      </>
    </div>
  );
}
