import Link from "next/link";
import { navItems } from "@/utils";
import UserProfile from "./UserProfile";
import SearchForm from "./SearchForm";
import AddProject from "../projects/AddProject";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Mobilebar({
  navTitle = "",
  navLink = "#",
}: {
  navTitle?: string;
  navLink?: string;
}) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <div className="px-3 pt-2 pb-5 border-b">
                <UserProfile />
              </div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center mt-6 mb-2 px-3">
                <Link href={"/dashboard/projects"} className="flex flex-1">
                  프로젝트
                </Link>
                <AddProject />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center md:justify-between w-full gap-1 md:gap-2 py-2">
          <div className="hidden sm:block sm:flex-1">
            <Link href={navLink}>
              <p className="text-sm font-semibold text-foreground/70 w-24">
                {navTitle}
              </p>
            </Link>
          </div>
          <div className="w-full flex-1">
            <SearchForm />
          </div>
        </div>
      </header>
    </div>
  );
}
