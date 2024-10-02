"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";

import Sidebar from "@/components/nav/Sidebar";
import Mobilebar from "@/components/nav/Mobilebar";
import Projects from "@/components/pages/Projects";

export default function ProjectsPage() {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Mobilebar />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <Projects />
        </div>
      </div>
    </div>
  );
}
