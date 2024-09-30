"use client";

import { FolderPlus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

export default function AddProject() {
  return (
    <Dialog>
      <DialogTrigger id="closeDialog">
        <FolderPlus
          className="w-5 h-5 text-muted-foreground hover:text-primary transition-all"
          aria-label="프로젝트 추가"
        />
      </DialogTrigger>
      <AddProjectContent />
    </Dialog>
  );
}

function AddProjectContent() {
  const form = useForm({ defaultValues: { name: "" } });
  const router = useRouter();
  const { toast } = useToast();

  const createProject = useMutation(api.projects.createProject);

  const onSubmit = async ({ name }: any) => {
    console.log("submitted", { name });

    const projectId = await createProject({ name });

    if (projectId !== undefined) {
      toast({
        title: "🦄 프로젝트가 생성되었습니다.",
        duration: 3000,
      });
      form.reset({ name: "" });
      router.push(`/dashboard/projects/${projectId}`);
    }
  };

  return (
    <DialogContent className="max-w-xl lg:h-56 flex text-right">
      <DialogHeader className="w-full">
        <DialogTitle>프로젝트 추가</DialogTitle>
        <DialogDescription className="capitalize">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 border p-6 border-gray-200 my-2 rounded-sm border-foreground/20 flex justify-between items-center"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="프로젝트 이름"
                        required
                        className="border-0 font-semibold text-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button>등록</Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
