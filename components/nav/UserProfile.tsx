"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const session = useSession();
  return (
    <div>
      <Image
        src={session?.data?.user?.image as string}
        width={24}
        height={24}
        alt="user profile"
        className="rounded-full"
      />
    </div>
  );
}
