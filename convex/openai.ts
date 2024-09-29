import { v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

export const suggestAi = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const todos = await ctx.runQuery(api.todos.getTodos, { projectId });

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 1 additional to-do items for the project with projectName that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. and please change it to Korean. Ensure there are no duplicates between the existing list and the new suggestions.",
        },
        {
          role: "user",
          content: JSON.stringify({
            todos,
          }),
        },
      ],
      response_format: {
        type: "json_object",
      },
      model: "gpt-3.5-turbo",
    });
    console.log(response.choices[0]);

    const messageContent = response.choices[0].message?.content;

    console.log({ messageContent });

    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsAI(taskName);

        await ctx.runMutation(api.todos.createTodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          embedding,
        });
      }
    }
  },
});

export const suggestSubAi = action({
  args: {
    projectId: v.id("projects"),
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { projectId, parentId, taskName, description }) => {
    const todos = await ctx.runQuery(api.subTodos.getSubTodos, { parentId });
    const project = await ctx.runQuery(api.projects.getProjectId, {
      projectId,
    });
    const projectName = project?.name || "";

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 1 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. and please change it to Korean. Ensure there are no duplicates between the existing list and the new suggestions.",
        },
        {
          role: "user",
          content: JSON.stringify({
            todos,
            projectName,
            ...{ parentTodo: { taskName, description } },
          }),
        },
      ],
      response_format: {
        type: "json_object",
      },
      model: "gpt-3.5-turbo",
    });
    console.log(response.choices[0]);

    const messageContent = response.choices[0].message?.content;

    console.log({ messageContent });

    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsAI(taskName);

        await ctx.runMutation(api.subTodos.createSubTodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          parentId,
          embedding,
        });
      }
    }
  },
});

export const getEmbeddingsAI = async (searchText: string) => {
  if (!apiKey) {
    throw new Error("Open AI key가 존재하지 않습니다.");
  }

  const req = {
    input: searchText,
    model: "text-embedding-ada-002",
    encoding_format: "float",
  };

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`OpenAI Error ${msg}`);
  }

  const json = await response.json();
  const vector = json["data"][0]["embedding"];

  console.log(`Embedding ${searchText}: ${vector.length}`);

  return vector;
};
