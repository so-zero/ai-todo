import { mutation, query } from "./_generated/server";
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
