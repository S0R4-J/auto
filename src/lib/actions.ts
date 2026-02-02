"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

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
  const session = await auth();

  try {
    // 1. Check for overlapping bookings
    const existingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: { notIn: ["cancelled", "rejected"] },
        OR: [
          {
            startDate: { lte: dates.to },
            endDate: { gte: dates.from },
          },
        ],
      },
    });

    if (existingBooking) {
      return { success: false, error: "На выбранные даты автомобиль уже занят." };
    }

    // 2. Save to DB
    const booking = await prisma.booking.create({
      data: {
        carId,
        clientName,
        contact,
        startDate: dates.from,
        endDate: dates.to,
        userId: session?.user?.id,
      },
      include: {
        car: true,
      },
    });

    // 3. Send Telegram Notification
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

async function checkAdmin() {
  const session = await auth();
  
  if (!session?.user) return false;
  
  if (session.user.role !== "admin") return false;

  return true;
}

export async function createCar(data: z.infer<typeof carSchema>) {
  if (!(await checkAdmin())) {
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
  if (!(await checkAdmin())) {
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
  if (!(await checkAdmin())) {
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

const registerSchema = z.object({
  name: z.string().min(2, "Имя должно быть не менее 2 символов"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export async function register(data: z.infer<typeof registerSchema>) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message };
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Пользователь с таким email уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Ошибка при регистрации" };
  }
}
