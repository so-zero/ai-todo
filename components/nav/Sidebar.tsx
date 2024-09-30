"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import clsx from "clsx";

import { navItems } from "@/utils";
import { Hash } from "lucide-react";
import UserProfile from "./UserProfile";
import AddProject from "../projects/AddProject";

interface MyListTitleType {
  [key: string]: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const projectList = useQuery(api.projects.getProjects);

  const LIST_OF_TITLE_IDS: MyListTitleType = {
    primary: "",
    projects: "프로젝트",
  };

  const [primaryNavItems, setPrimaryNavItems] = useState([...navItems]);

  const renderItems = (projectList: Array<Doc<"projects">>) => {
    return projectList.map((project, index) => {
      return {
        ...(index === 0 && { id: "projects" }),
        name: project.name,
        link: `/dashboard/projects/${project._id}`,
        icon: <Hash className="w-4 h-4" />,
      };
    });
  };

  useEffect(() => {
    if (projectList) {
      const projectItems = renderItems(projectList);
      const items = [...navItems, ...projectItems];
      setPrimaryNavItems(items);
    }
  }, [projectList]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <UserProfile />
        </div>
        <div className="flex-1">
          <div></div>
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            {primaryNavItems.map((item, index) => (
              <div key={index}>
                {item.id && (
                  <div className="flex items-center mt-6 mb-2 px-3">
                    <p className="flex flex-1 text-base">
                      {LIST_OF_TITLE_IDS[item?.id]}
                    </p>
                    {LIST_OF_TITLE_IDS[item?.id] === "프로젝트" && (
                      <AddProject />
                    )}
                  </div>
                )}
                <Link
                  href={item.link}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
                    pathname === item.link
                      ? "active bg-primary/10 hover:text-primary transition-all"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
