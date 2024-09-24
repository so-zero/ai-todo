"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOutAction } from "@/hooks/authAction";

export default function UserProfile() {
  const session = useSession();

  const imageUrl = session?.data?.user?.image as string;
  const name = session?.data?.user?.name as string;
  const email = session?.data?.user?.email as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <div className="flex items-center justify-start gap-2 lg:gap-3 m-0 p-0 lg:w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={24}
              height={24}
              alt={name}
              className="rounded-full"
            />
          ) : (
            <CircleUser className="h-5 w-5 rounded-full" />
          )}
          <p className="truncate">{email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="lg:w-full px-28 flex items-center justify-center">
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="hover:text-primary text-center"
            >
              로그아웃
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
