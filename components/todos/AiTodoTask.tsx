import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AiTodoTask({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const suggestAi = useAction(api.openai.suggestAi) || [];

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

  return (
    <Button variant="outline" disabled={isLoading} onClick={handleAiTask}>
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
