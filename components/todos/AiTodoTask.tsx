import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AiTodoTask({
  projectId,
  isSubTask = false,
  taskName = "",
  description = "",
  parentId,
}: {
  projectId: Id<"projects">;
  isSubTask: boolean;
  taskName?: string;
  description?: string;
  parentId?: Id<"todos">;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const suggestAi = useAction(api.openai.suggestAi) || [];
  const suggestSubAi = useAction(api.openai.suggestSubAi) || [];

  const handleAiTask = async () => {
    setIsLoading(true);
    try {
      await suggestAi({ projectId });
    } catch (error) {
      console.log("AI 추천 오류", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiSubTask = async () => {
    setIsLoading(true);
    try {
      await suggestSubAi({ projectId, taskName, description, parentId });
    } catch (error) {
      console.log("AI 추천 오류", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      onClick={isSubTask ? handleAiSubTask : handleAiTask}
    >
      {isLoading ? (
        <div className="flex gap-2">
          AI 로딩 🤖
          <Loader className="w-5 h-5 text-primary" />
        </div>
      ) : (
        "AI 추천🤖"
      )}
    </Button>
  );
}
