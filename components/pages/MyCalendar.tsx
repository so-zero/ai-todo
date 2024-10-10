import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AddTask } from "../todos/AddTaskBtn";

moment.locale("ko-KR");

const localizer = momentLocalizer(moment);

const allViews: View[] = ["month"];

export default function MyCalendar() {
  const inCompletedTodos = useQuery(api.todos.inCompletedTodos) ?? [];

  const calenderData = inCompletedTodos?.map((data) => ({
    ...data,
    start: data.dueDate,
    end: data.dueDate,
    title: data.taskName,
  }));

  return (
    <div className="xl:px-40">
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-semibold md:text-2xl p-2">
          {moment(new Date()).format("YYYY년 MM월")}
        </h1>
        <div className="mb-3">
          <AddTask />
        </div>
      </div>

      <Calendar
        toolbar={false}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={calenderData}
        views={allViews}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
