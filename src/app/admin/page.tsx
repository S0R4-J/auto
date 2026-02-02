import { getBookings, getCars } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteCarButton } from "@/components/admin/DeleteCarButton";
import { BookingCalendar } from "@/components/admin/BookingCalendar";

export default async function AdminPage() {
  const bookings = await getBookings();
  const cars = await getCars();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="bookings">
        <TabsList className="mb-4">
          <TabsTrigger value="bookings">Заявки ({bookings.length})</TabsTrigger>
          <TabsTrigger value="calendar">Календарь</TabsTrigger>
          <TabsTrigger value="cars">Автопарк ({cars.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="grid gap-4">
            {bookings.length === 0 && <p>Нет активных заявок.</p>}
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{booking.clientName}</span>
                    <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                      {booking.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Авто:</span>
                    <span className="font-medium">{booking.car.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Контакты:</span>
                    <span className="font-medium">{booking.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Даты:</span>
                    <span className="font-medium">
                      {booking.startDate.toLocaleDateString()} -{" "}
                      {booking.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <BookingCalendar bookings={bookings} cars={cars} />
        </TabsContent>
        
        <TabsContent value="cars">
          <div className="mb-4 flex justify-end">
            <Button asChild>
              <Link href="/admin/cars/new">Добавить авто</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <Card key={car.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{car.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Цена:</span>
                    <span className="font-medium">${car.price}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Статус:</span>
                    <Badge variant={car.isAvailable ? "outline" : "destructive"}>
                      {car.isAvailable ? "Свободна" : "Занята"}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/cars/${car.id}/edit`}>Редактировать</Link>
                  </Button>
                  <DeleteCarButton carId={car.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
