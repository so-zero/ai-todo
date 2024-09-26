import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { format } from "date-fns";

import { Calendar, Flag, Hash } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function TodoDialog({
  data: { taskName, description, projectId, dueDate, priority },
}: {
  data: Doc<"todos">;
}) {
  const project = useQuery(api.projects.getProjectId, { projectId });

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
    <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col">
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
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
