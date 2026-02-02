"use client";

import { useState } from "react";
import { Booking, Car } from "@prisma/client";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  bookings: (Booking & { car: Car })[];
  cars: Car[];
}

export function BookingCalendar({ bookings, cars }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">
          {format(currentDate, "LLLL yyyy", { locale: ru })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="flex border-b bg-muted/50">
            <div className="w-48 shrink-0 border-r p-2 font-medium">Автомобиль</div>
            {days.map((day) => (
              <div
                key={day.toString()}
                className={cn(
                  "flex w-10 shrink-0 flex-col items-center justify-center border-r p-1 text-xs",
                  isSameDay(day, new Date()) && "bg-primary/10 font-bold text-primary"
                )}
              >
                <span>{format(day, "dd")}</span>
                <span className="text-[10px] text-muted-foreground">
                  {format(day, "EE", { locale: ru })}
                </span>
              </div>
            ))}
          </div>

          {/* Car Rows */}
          {cars.map((car) => (
            <div key={car.id} className="flex border-b last:border-0">
              <div className="flex w-48 shrink-0 items-center border-r p-2 text-sm font-medium">
                {car.name}
              </div>
              {days.map((day) => {
                const booking = bookings.find(
                  (b) =>
                    b.carId === car.id &&
                    b.status !== "cancelled" &&
                    isWithinInterval(day, {
                      start: new Date(b.startDate),
                      end: new Date(b.endDate),
                    })
                );

                let cellClass = "bg-transparent";
                let isStart = false;
                let isEnd = false;

                if (booking) {
                  cellClass = "bg-blue-500/20";
                  if (booking.status === "confirmed") cellClass = "bg-green-500/20";
                  if (booking.status === "pending") cellClass = "bg-yellow-500/20";
                  
                  isStart = isSameDay(day, new Date(booking.startDate));
                  isEnd = isSameDay(day, new Date(booking.endDate));
                }

                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      "relative w-10 shrink-0 border-r p-1",
                      cellClass
                    )}
                    title={booking ? `${booking.clientName} (${booking.status})` : undefined}
                  >
                    {isStart && (
                      <div className="absolute inset-y-1 left-0 w-1 rounded-full bg-blue-600" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
