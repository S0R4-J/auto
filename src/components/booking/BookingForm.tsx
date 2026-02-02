"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { submitBooking } from "@/lib/actions";
import { useState } from "react";

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа.",
  }),
  contact: z.string().min(10, {
    message: "Введите корректный номер телефона.",
  }),
  dates: z.object({
    from: z.date({
      message: "Выберите дату начала.",
    }),
    to: z.date({
      message: "Выберите дату окончания.",
    }),
  }),
});

interface BookingFormProps {
  carId: string;
  pricePerDay: number;
}

export function BookingForm({ carId, pricePerDay }: BookingFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      contact: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const result = await submitBooking({ ...values, carId });
      if (result.success) {
        toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        form.reset();
      } else {
        toast.error("Ошибка при отправке заявки. Попробуйте позже.");
      }
    } catch {
      toast.error("Произошла ошибка.");
    } finally {
      setIsPending(false);
    }
  }

  const dates = form.watch("dates");
  const days =
    dates?.from && dates?.to
      ? Math.ceil(
          (dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;
  const totalPrice = days > 0 ? days * pricePerDay : 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон / Telegram</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 000-00-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Даты аренды</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Выберите даты</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {totalPrice > 0 && (
          <div className="rounded-lg glass-card p-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Дней аренды:</span>
              <span className="font-medium text-white">{days}</span>
            </div>
            <div className="mt-2 flex justify-between text-lg font-bold text-white">
              <span>Итого:</span>
              <span className="text-white">${totalPrice}</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" size="lg" disabled={isPending}>
          {isPending ? "Отправка..." : "Забронировать"}
        </Button>
      </form>
    </Form>
  );
}
