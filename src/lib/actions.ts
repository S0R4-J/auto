"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/auth";

const bookingSchema = z.object({
  carId: z.string(),
  clientName: z.string().min(2, "Имя должно быть длиннее 2 символов"),
  contact: z.string().min(10, "Введите корректный номер телефона"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export async function submitBooking(data: z.infer<typeof bookingSchema>) {
  const result = bookingSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  const { carId, clientName, contact, dates } = result.data;

  try {
    // 1. Save to DB
    const booking = await prisma.booking.create({
      data: {
        carId,
        clientName,
        contact,
        startDate: dates.from,
        endDate: dates.to,
      },
      include: {
        car: true,
      },
    });

    // 2. Send Telegram Notification
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const message = `
🚗 *Новая заявка!*
Авто: ${booking.car.name}
Клиент: ${clientName}
Контакты: ${contact}
Даты: ${dates.from.toLocaleDateString()} - ${dates.to.toLocaleDateString()}
      `;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

const carSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  price: z.coerce.number().int().positive(),
  image: z.string().url(),
  bodyType: z.string(),
  brand: z.string(),
  specs: z.string(),
  isAvailable: z.boolean(),
});

export async function createCar(data: z.infer<typeof carSchema>) {
  if (!(await checkAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  const result = carSchema.safeParse(data);
  if (!result.success) return { success: false, error: "Invalid data" };

  try {
    await prisma.car.create({ data: result.data });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create car" };
  }
}

export async function updateCar(id: string, data: z.infer<typeof carSchema>) {
  if (!(await checkAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  const result = carSchema.safeParse(data);
  if (!result.success) return { success: false, error: "Invalid data" };

  try {
    await prisma.car.update({ where: { id }, data: result.data });
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath(`/cars/${result.data.slug}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update car" };
  }
}

export async function deleteCar(id: string) {
  if (!(await checkAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.car.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete car" };
  }
}
