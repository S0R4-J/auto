import { auth } from "@/auth";
import { getUserBookings } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const bookings = await getUserBookings();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        <p className="text-muted-foreground">Добро пожаловать, {session.user.name}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1">
                <span className="text-xs font-medium uppercase text-muted-foreground">Имя</span>
                <span>{session.user.name}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-xs font-medium uppercase text-muted-foreground">Email</span>
                <span>{session.user.email}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-xs font-medium uppercase text-muted-foreground">Роль</span>
                <Badge variant="outline" className="w-fit">
                  {(session.user as any).role || "user"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main>
          <h2 className="mb-4 text-xl font-semibold">Мои бронирования</h2>
          <div className="grid gap-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  У вас пока нет активных или прошлых бронирований.
                </CardContent>
              </Card>
            ) : (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{booking.car.name}</span>
                      <Badge variant={
                        booking.status === "pending" ? "secondary" : 
                        booking.status === "confirmed" ? "default" : 
                        booking.status === "completed" ? "outline" : "destructive"
                      }>
                        {booking.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Даты:</span>
                      <span className="font-medium">
                        {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Контактные данные:</span>
                      <span className="font-medium">{booking.contact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
