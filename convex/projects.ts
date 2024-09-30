import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), projectId))
      .collect();

    return project?.[0] || null;
  },
});

export const createProject = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { name, userId }) => {
    try {
      const newTaskId = await ctx.db.insert("projects", {
        userId,
        name,
        type: "user",
      });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createProject mutation", err);
      return "";
    }
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const taskId = await ctx.db.delete(projectId);
      return taskId;
    } catch (err) {
      console.log("Error occurred during deleteProject mutation", err);
      return null;
    }
  },
});

export const deleteProjectAndTasks = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const allTasks = await ctx.runQuery(api.todos.getTodos, {
        projectId,
      });
      const promises = Promise.allSettled(
        allTasks.map(async (task: Doc<"todos">) =>
          ctx.runMutation(api.todos.deleteTodo, {
            taskId: task._id,
          })
        )
      );

      const statuses = await promises;
      console.log("All tasks promises deletion list", statuses);

      await ctx.runMutation(api.projects.deleteProject, { projectId });
    } catch (err) {
      console.log("Error occurred during deleteProjectAndTasks mutation", err);
    }
  },
});
