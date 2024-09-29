import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subTodos").collect();
  },
});

export const getSubTodos = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    return await ctx.db
      .query("subTodos")
      .filter((q) => q.eq(q.field("parentId"), parentId))
      .collect();
  },
});

export const completedSubTodos = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    return await ctx.db
      .query("subTodos")
      .filter((q) => q.eq(q.field("parentId"), parentId))
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const inCompletedSubTodos = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    return await ctx.db
      .query("subTodos")
      .filter((q) => q.eq(q.field("parentId"), parentId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const checkSubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckSubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createSubTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.number(),
    projectId: v.id("projects"),
    parentId: v.id("todos"),
  },
  handler: async (
    ctx,
    { taskName, description, dueDate, priority, projectId, parentId }
  ) => {
    try {
      const newTaskId = await ctx.db.insert("subTodos", {
        userId: "jn7bq0h9sesjcm8keyppz3j1sh71brja" as Id<"users">,
        taskName,
        parentId,
        description,
        dueDate,
        priority,
        projectId,
        isCompleted: false,
      });
      return newTaskId;
    } catch (error) {
      console.log("create subTodo Error", error);
      return null;
    }
  },
});
