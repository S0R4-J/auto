export default function ContactsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Контакты</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Мы всегда рады ответить на ваши вопросы и помочь с выбором автомобиля.</p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Наши контакты</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-center gap-2">
                <span className="font-semibold">Телефон:</span>
                <a href="tel:+79990000000" className="hover:text-primary transition-colors">+7 (999) 000-00-00</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">Email:</span>
                <a href="mailto:contact@premium-cars.com" className="hover:text-primary transition-colors">contact@premium-cars.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">Адрес:</span>
                <span>г. Москва, ул. Премиальная, д. 1, офис 101</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Режим работы</h2>
            <p>Ежедневно с 9:00 до 21:00 без выходных.</p>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Остались вопросы?</h2>
            <p className="mb-4">Заполните форму обратной связи, и мы свяжемся с вами в течение 15 минут.</p>
            <div className="h-32 bg-background/50 rounded border border-dashed flex items-center justify-center text-muted-foreground">
              Форма обратной связи
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
