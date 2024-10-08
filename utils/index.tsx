import {
  Inbox,
  CalendarCheck,
  CalendarDays,
  CalendarArrowDown,
} from "lucide-react";

export const navItems = [
  {
    id: "primary",
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
    icon: <CalendarArrowDown className="w-4 h-4" />,
  },
  {
    name: "달력",
    link: "/dashboard/calendar",
    icon: <CalendarDays className="w-4 h-4" />,
  },
];

export const GET_STARTED_PROJECT_ID = "k570jjxpb4wbtr5pyymj4qs9vh71fr1c";
