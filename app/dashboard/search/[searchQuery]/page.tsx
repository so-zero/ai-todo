"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";

import Mobilebar from "@/components/nav/Mobilebar";
import Sidebar from "@/components/nav/Sidebar";
import Todos from "@/components/todos/Todos";

export default function Search() {
  const { searchQuery } = useParams<{ searchQuery: string }>();

  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchInProgress, setSearchInProgress] = useState(false);

  const vectorSearch = useAction(api.search.searchTasks);

  console.log({ searchQuery });

  useEffect(() => {
    const handleSearch = async () => {
      setSearchResults([]);

      setSearchInProgress(true);
      try {
        const results = await vectorSearch({
          query: searchQuery,
        });

        setSearchResults(results);
      } finally {
        setSearchInProgress(false);
      }
    };

    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, vectorSearch]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Mobilebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <div className="xl:px-40">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold md:text-2xl">
                검색결과:
                <span className="ml-2">
                  {`"`}
                  {decodeURI(searchQuery)}
                  {`"`}
                </span>
              </h1>
            </div>

            <div className="flex flex-col gap-1 py-4">
              <Todos
                todo={searchResults.filter(
                  (todo: any) => todo.isCompleted === false
                )}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
