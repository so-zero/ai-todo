import { Inbox, CalendarCheck, CalendarDays } from "lucide-react"; 
 
export const navItems = [
    {
      name: "대시보드",
      link: "/dashboard",
      icon: <Inbox className="w-4 h-4" />,
    },
    {
      name: "오늘",
      link: "/dashboard/today",
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      name: "다음",
      link: "/dashboard/upcoming",
      icon: <CalendarDays className="w-4 h-4" />,
    },
  ];