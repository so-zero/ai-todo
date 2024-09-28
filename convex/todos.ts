import moment from "moment";
import { Id } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const getCompletedTodos = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const getInCompletedTodos = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const getTotalProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("projectId"), projectId))
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();

    return todos?.length || 0;
  },
});

export const todayTodos = query({
  args: {},
  handler: async (ctx) => {
    const todayStart = moment().startOf("day");
    const todayEnd = moment().endOf("day");

    return await ctx.db
      .query("todos")
      .filter(
        (q) =>
          q.gte(q.field("dueDate"), todayStart.valueOf()) &&
          q.lte(todayEnd.valueOf(), q.field("dueDate"))
      )
      .collect();
  },
});

export const lastTodos = query({
  args: {},
  handler: async (ctx) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    return await ctx.db
      .query("todos")
      .filter((q) => q.lt(q.field("dueDate"), todayStart.getTime()))
      .collect();
  },
});

export const upcomingTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.gt(q.field("dueDate"), new Date().getTime()))
      .collect();

    const upcoming = todos.reduce<any>((acc, todo) => {
      const dueDate = new Date(todo.dueDate).toDateString();
      acc[dueDate] = (acc[dueDate] || []).concat(todo);
      return acc;
    }, {});

    return upcoming;
  },
});

export const completedTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const inCompletedTodos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();

    return todos.length || 0;
  },
});

export const checkTodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckTodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.number(),
    projectId: v.id("projects"),
  },
  handler: async (
    ctx,
    { taskName, description, dueDate, priority, projectId }
  ) => {
    try {
      const newTaskId = await ctx.db.insert("todos", {
        userId: "jn7bq0h9sesjcm8keyppz3j1sh71brja" as Id<"users">,
        taskName,
        description,
        dueDate,
        priority,
        projectId,
        isCompleted: false,
      });
      return newTaskId;
    } catch (error) {
      console.log("createTodo Error", error);
      return null;
    }
  },
});
