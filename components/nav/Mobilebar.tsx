import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/utils";
import UserProfile from "./UserProfile";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FolderPlus } from "lucide-react";

export default function Mobilebar() {
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
                <p className="flex flex-1">프로젝트</p>
                <Dialog>
                  <DialogTrigger id="closeDialog">
                    <FolderPlus
                      className="w-5 h-5 text-muted-foreground hover:text-primary transition-all"
                      aria-label="프로젝트 추가"
                    />
                  </DialogTrigger>
                  <DialogContent>Hi</DialogContent>
                </Dialog>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}
