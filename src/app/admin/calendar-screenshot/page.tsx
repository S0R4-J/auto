import { Card, CardContent } from "@/components/ui/card";

export default function CalendarScreenshotPage() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <h1 className="mb-8 text-3xl font-bold">Календарь бронирований</h1>
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <div className="grid min-w-[800px] gap-y-2">
              {/* Header */}
              <div className="grid grid-cols-[200px_repeat(31,1fr)] gap-x-2 text-sm font-medium text-muted-foreground">
                <div className="sticky left-0 bg-background">Автомобиль</div>
                {Array.from({ length: 31 }, (_, i) => (
                  <div key={i} className="text-center">{i + 1}</div>
                ))}
              </div>

              {/* Cars */}
              {[
                "Porsche 911",
                "Lamborghini Urus",
                "Mercedes S-Class",
                "Range Rover",
                "BMW 7 Series",
              ].map((carName, index) => (
                <div key={carName} className="grid grid-cols-[200px_repeat(31,1fr)] items-center gap-x-2 border-t py-2">
                  <div className="sticky left-0 bg-background font-medium">{carName}</div>
                  {/* Bookings Placeholder */}
                  <div className="col-start-3 col-span-4 h-6 rounded-md bg-primary/80 flex items-center justify-center text-xs text-primary-foreground">
                    Booking #1
                  </div>
                   <div className="col-start-10 col-span-5 h-6 rounded-md bg-blue-500/80 flex items-center justify-center text-xs text-white">
                    Booking #2
                  </div>
                   <div className="col-start-18 col-span-3 h-6 rounded-md bg-green-500/80 flex items-center justify-center text-xs text-white">
                    Booking #3
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
