import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getCars() {
  try {
    const cars = await prisma.car.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: "desc" },
    });
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export async function getCarBySlug(slug: string) {
  try {
    const car = await prisma.car.findUnique({
      where: { slug },
    });
    return car;
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

export async function getBookings() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return [];
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { car: true },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function getUserBookings() {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { car: true },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
}
