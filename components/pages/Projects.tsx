"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Hash } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";

export default function Projects() {
  const projects = useQuery(api.projects.getProjects);

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">프로젝트</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        {projects?.map((project) => {
          return (
            <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
              <div className="flex items-center py-2 space-x-2 border-b border-gray-100">
                <Hash className="text-primary w-4 h-4" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer"
                >
                  {project.name}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
