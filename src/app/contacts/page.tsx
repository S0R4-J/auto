import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">Контакты</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Мы всегда рады ответить на ваши вопросы и помочь с выбором идеального автомобиля для вашей поездки.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="glass-card border-none">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-bold">Телефон</h3>
                <a href="tel:+79990000000" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +7 (999) 000-00-00
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-bold">Email</h3>
                <a href="mailto:contact@premium-cars.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  contact@premium-cars.com
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-bold">Адрес</h3>
                <p className="text-sm text-muted-foreground">
                  г. Москва, ул. Премиальная, д. 1, офис 101
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-bold">Режим работы</h3>
                <p className="text-sm text-muted-foreground">
                  Ежедневно: 09:00 — 21:00
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 opacity-20" />
                <p className="text-sm">Интерактивная карта загружается...</p>
              </div>
            </div>
            {/* В реальном проекте здесь будет iframe или компонент карты */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          </div>
        </div>

        {/* Contact Form */}
        <Card className="glass-card border-none h-fit">
          <CardHeader>
            <CardTitle className="text-2xl">Напишите нам</CardTitle>
            <p className="text-sm text-muted-foreground">
              Заполните форму, и наш менеджер свяжется с вами в течение 15 минут.
            </p>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input id="name" placeholder="Иван Иванов" className="bg-background/50" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ivan@example.com" className="bg-background/50" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Сообщение</Label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Расскажите о ваших пожеланиях..."
                />
              </div>
              <Button type="submit" className="w-full">
                Отправить сообщение
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
