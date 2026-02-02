export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-8 text-3xl font-bold">Условия аренды</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Мы ценим ваше время и доверие, поэтому сделали условия аренды максимально прозрачными и понятными.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Требования к арендатору</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Возраст от 25 лет</li>
          <li>Стаж вождения от 3 лет</li>
          <li>Наличие действующего паспорта и водительского удостоверения</li>
          <li>Отсутствие грубых нарушений ПДД в истории вождения</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Условия оплаты и залога</h2>
        <p>Оплата производится любым удобным способом: банковской картой, наличными или безналичным расчетом. При аренде автомобиля вносится страховой депозит, который возвращается после завершения аренды.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Страхование</h2>
        <p>Все наши автомобили застрахованы по КАСКО и ОСАГО. Ваша ответственность ограничена суммой франшизы в случае ДТП по вашей вине.</p>
      </div>
    </div>
  );
}
