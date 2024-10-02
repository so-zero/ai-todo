"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Sidebar from "@/components/nav/Sidebar";
import Mobilebar from "@/components/nav/Mobilebar";
import Today from "@/components/pages/Today";

export default function TodayPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, [session.data?.user, router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Mobilebar />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <Today />
        </div>
      </div>
    </div>
  );
}
