"use client";
import { useFormStatus } from "react-dom";
import { signInAction } from "@/lib/actions/auth";

import clsx from "clsx";
import { Hash, Loader, StepForward } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white h-full min-h-screen">
      <div className="container mx-auto py-10 px-10 lg:px-20">
        <div className="flex items-center justify-center flex-col gap-3 md:flex-row md:justify-between">
          <div className="flex items-center gap-1">
            <Hash className="w-6 h-6 text-rose-400" />
            <h1 className="text-xl md:text-2xl font-medium text-gray-950">
              OneTask
            </h1>
          </div>
          <form action={signInAction}>
            <GoogleSignInButton />
          </form>
        </div>
        <div className="mt-16 md:mt-32 flex flex-col items-center">
          <h1 className="font-bold text-lg lg:text-2xl ">
            당신의 하루를 정리하세요.
          </h1>
          <div className="pt-6 pb-10 flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center text-base lg:text-xl">
            <span>📄 할 일 목록</span>
            <span>📂 나만의 폴더</span>
            <span>🤖 AI 할 일 추천</span>
            <span>✅ 무제한 체크리스트</span>
          </div>
          <p className="text-lg lg:text-xl px-6">
            <span className="font-semibold text-rose-400">OneTask</span>는
            간단하고 효과적인 to-do 리스트이자 할 일 관리 어플입니다.
          </p>
        </div>
        <div className="mt-20 flex items-center justify-center">
          <form action={signInAction}>
            <GetStartedButton />
          </form>
        </div>
      </div>
    </main>
  );
}
function GetStartedButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-8 py-4 mb-2 text-xl font-medium text-gray-100 rounded-xl group bg-black hover:bg-gray-800"
    >
      <span className="flex items-center gap-1">
        {pending ? (
          <span className=" px-16">
            <Loader className="w-5 h-5" />
          </span>
        ) : (
          <>
            시작하기
            <StepForward />
          </>
        )}
      </span>
    </button>
  );
}

function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="p-3 text-sm font-medium rounded-xl text-black bg-rose-300 hover:bg-rose-200"
    >
      <span className="flex items-center gap-1">
        {pending ? (
          <span className="px-6">
            <Loader className="w-5 h-5" />
          </span>
        ) : (
          "구글로 로그인하기"
        )}
      </span>
    </button>
  );
}
