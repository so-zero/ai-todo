"use client";

import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import moment from "moment";

import clsx from "clsx";
import { Bookmark, CalendarIcon, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { CardFooter } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "A due date is required" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  projectId: z.string().min(1, { message: "Please select a project" }),
});

export default function AddTaskTodo({
  setShowAddTask,
}: {
  setShowAddTask: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const projects = useQuery(api.projects.getProjects) ?? [];

  const createTodo = useMutation(api.todos.createTodo);

  const defaultValues = {
    taskName: "",
    description: "",
    dueDate: new Date(),
    priority: "1",
    projectId: ("k570jjxpb4wbtr5pyymj4qs9vh71fr1c" as Id<"projects">) || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { taskName, description, dueDate, priority, projectId } = data;

    if (projectId) {
      const mutationId = createTodo({
        taskName,
        description,
        dueDate: moment(dueDate).valueOf(),
        priority: parseInt(priority),
        projectId: projectId as Id<"projects">,
      });

      if (mutationId !== undefined) {
        toast({
          title: "💖 등록되었습니다.",
          duration: 3000,
        });
        form.reset({ ...defaultValues });
        setShowAddTask(false);
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 p-2 px-3 pt-4 my-2 rounded-xl border border-gray-200 border-foreground/20"
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="taskName"
                    type="text"
                    placeholder="제목"
                    required
                    className="border-0 font-semibold text-lg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Text className="ml-auto w-4 h-4 opacity-50" />
                    <Textarea
                      id="description"
                      placeholder="설명"
                      className="resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-center">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={clsx(
                            "flex gap-2 w-[200px] lg:w-[260px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[110px] lg:w-[130px]">
                        <SelectValue placeholder="중요도" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3].map((item, index) => (
                        <SelectItem key={index} value={item.toString()}>
                          <div className="flex items-center">
                            <Bookmark className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                            중요 {item}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[150px] md:w-[240px]">
                        <SelectValue placeholder="프로젝트" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map(
                        (project: Doc<"projects">, index: number) => (
                          <SelectItem key={index} value={project._id}>
                            {project?.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CardFooter className="flex flex-col lg:flex-row lg:justify-between gap-2 pt-3">
            <div className="w-full lg:w-1/4"></div>
            <div className="flex gap-3 self-end">
              <Button className="px-6" type="submit">
                등록
              </Button>
              <Button
                className="px-6 bg-gray-300/40 text-gray-950 hover:bg-gray-300"
                variant="outline"
                type="submit"
                onClick={() => setShowAddTask(false)}
              >
                취소
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
