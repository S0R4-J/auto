export default function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">О нас</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Premium Car Rental - ваш надежный партнер в мире элитных автомобилей. Мы предлагаем только лучшие модели и безупречный сервис для тех, кто ценит комфорт и статус.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Наша миссия</h2>
        <p>Мы стремимся предоставить нашим клиентам незабываемые впечатления от вождения лучших автомобилей мира. Наша цель - сделать аренду премиального авто максимально простой и удобной.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Почему выбирают нас</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Исключительно новые автомобили в максимальной комплектации</li>
          <li>Круглосуточная поддержка и персональный менеджер</li>
          <li>Доставка автомобиля в любую точку города</li>
          <li>Прозрачные условия аренды без скрытых платежей</li>
        </ul>
      </div>
    </div>
  );
}
