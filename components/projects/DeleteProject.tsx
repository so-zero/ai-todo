import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisIcon, Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { GET_STARTED_PROJECT_ID } from "@/utils";

export default function DeleteProject({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const form = useForm({ defaultValues: { name: "" } });
  const router = useRouter();
  const { toast } = useToast();

  const deleteProject = useAction(api.projects.deleteProjectAndTasks);

  const onSubmit = async () => {
    if (projectId === GET_STARTED_PROJECT_ID) {
      toast({
        title: "🔔 시스템 알림",
        description: "시스템 프로젝트는 삭제할 수 없습니다.",
        duration: 3000,
      });
    } else {
      const deleteTaskId = await deleteProject({ projectId });

      if (deleteTaskId !== undefined) {
        toast({
          title: "🦄 삭제되었습니다.",
          duration: 3000,
        });
        router.push("/dashboard/projects");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon className="w-5 h-5 text-foreground hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="w-40 lg:w-56">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <button type="submit" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 hover:rotate-45 transition-all text-foreground/40" />
              <p>프로젝트 삭제하기</p>
            </button>
          </form>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
