import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

const Index = () => {
  const services = [
    { name: "Визитки", icon: "CreditCard" },
    { name: "Постеры", icon: "Image" },
    { name: "Листовки", icon: "FileText" },
    { name: "Буклеты", icon: "Book" },
    { name: "Фотокниги", icon: "BookOpen" },
    { name: "Календари", icon: "Calendar" },
    { name: "Сувениры", icon: "Gift" },
    { name: "Упаковка", icon: "Package" },
  ];

  const steps = [
    { title: "Выбор услуги", description: "Выберите тип печатной продукции из каталога" },
    { title: "Настройка", description: "Укажите размер, тираж, материал и другие параметры" },
    { title: "Макет", description: "Загрузите файл или выберите готовый шаблон" },
    { title: "Расчёт", description: "Получите точную стоимость автоматически" },
    { title: "Оплата", description: "Оплатите заказ онлайн любым удобным способом" },
    { title: "Доставка", description: "Получите заказ курьером или самовывозом" },
  ];

  const benefits = [
    {
      icon: "DollarSign",
      title: "Прозрачная стоимость",
      description: "Автоматический калькулятор — никаких скрытых платежей"
    },
    {
      icon: "Zap",
      title: "Быстрая печать",
      description: "Готовность заказа от 1 дня, экспресс-производство"
    },
    {
      icon: "Truck",
      title: "Доставка по России",
      description: "Курьерская доставка или самовывоз в удобное время"
    },
    {
      icon: "HeadphonesIcon",
      title: "Поддержка 24/7",
      description: "Консультация в чате, Telegram или по телефону"
    },
    {
      icon: "Layout",
      title: "Удобный интерфейс",
      description: "Интуитивный конструктор заказа без лишних шагов"
    },
    {
      icon: "CheckCircle",
      title: "Контроль качества",
      description: "Автоматическая проверка макета перед печатью"
    }
  ];

  const faqs = [
    {
      question: "Какие форматы файлов принимаете?",
      answer: "Мы принимаем PDF, AI, PSD, TIFF, JPG. Рекомендуем PDF с вылетами 3 мм и разрешением 300 dpi."
    },
    {
      question: "Как быстро выполняется заказ?",
      answer: "Стандартный срок — 2-3 дня. Экспресс-печать возможна за 1 день с доплатой 30%."
    },
    {
      question: "Можно ли заказать без готового макета?",
      answer: "Да! У нас есть библиотека готовых шаблонов и услуга разработки дизайна."
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Банковские карты, СБП, электронные кошельки, для юрлиц — безналичный расчёт."
    },
    {
      question: "Как отследить статус заказа?",
      answer: "После оформления вы получите ссылку на трекер заказа и уведомления в Telegram."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Printer" size={28} className="text-primary" />
            <span className="text-2xl font-bold text-secondary">MyPrintShop</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition">Услуги</a>
            <a href="#how" className="text-foreground hover:text-primary transition">Как работает</a>
            <a href="#benefits" className="text-foreground hover:text-primary transition">Преимущества</a>
            <a href="#faq" className="text-foreground hover:text-primary transition">FAQ</a>
          </nav>
          <Button className="hidden md:inline-flex">Сделать заказ</Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto text-center max-w-5xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-6 leading-tight">
            Онлайн-типография<br />
            <span className="text-primary">нового поколения</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto font-light">
            Загружайте макет, выбирайте параметры, оплачивайте — всё онлайн за 5 минут. Никаких визитов в офис.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Сделать заказ
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Icon name="Send" size={20} className="mr-2" />
              Открыть Telegram-бот
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Типографии не меняются уже 20 лет
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <div className="flex gap-3 items-start">
                  <Icon name="X" size={24} className="text-destructive mt-1 flex-shrink-0" />
                  <p>Долгие переписки с менеджером вместо автоматизации</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" size={24} className="text-destructive mt-1 flex-shrink-0" />
                  <p>Неясная стоимость до момента оплаты</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" size={24} className="text-destructive mt-1 flex-shrink-0" />
                  <p>Необходимость ехать в офис для согласования</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Icon name="X" size={24} className="text-destructive mt-1 flex-shrink-0" />
                  <p>Сложность подготовки макетов самостоятельно</p>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <Card className="bg-white shadow-xl border-2 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                    <Icon name="Sparkles" size={28} className="text-primary" />
                    Решение — MyPrintShop
                  </h3>
                  <div className="space-y-4 text-foreground">
                    <div className="flex gap-3 items-start">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <p>Автоматический калькулятор стоимости</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <p>Загрузка макета онлайн за 30 секунд</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <p>Готовые шаблоны дизайнов</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Icon name="CheckCircle" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <p>Онлайн-оплата и трекинг заказа</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">
            Каталог услуг
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Печатаем всё, что нужно вашему бизнесу
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <Icon name={service.icon} size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg">
              Все услуги <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">
            Как это работает
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16">
            Шесть простых шагов до готового заказа
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">
            Наши преимущества
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16">
            Почему тысячи клиентов выбирают MyPrintShop
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Icon name={benefit.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Icon name="Send" size={64} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Оформляйте заказ в Telegram
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Быстрее и удобнее — прямо в мессенджере. Все функции сайта в боте.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Icon name="Send" size={20} className="mr-2" />
            Открыть @MyPrintShop_bot
          </Button>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Ответы на популярные вопросы о работе сервиса
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border-2 border-border rounded-lg px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Printer" size={28} />
                <span className="text-xl font-bold">MyPrintShop</span>
              </div>
              <p className="text-white/70">Печать без лишних хлопот</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition">Визитки</a></li>
                <li><a href="#" className="hover:text-white transition">Постеры</a></li>
                <li><a href="#" className="hover:text-white transition">Листовки</a></li>
                <li><a href="#" className="hover:text-white transition">Фотокниги</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition">О нас</a></li>
                <li><a href="#" className="hover:text-white transition">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition">Отзывы</a></li>
                <li><a href="#" className="hover:text-white transition">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>hello@myprintshop.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Примерная, 1</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70">© 2024 MyPrintShop. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white transition">Политика конфиденциальности</a>
              <a href="#" className="text-white/70 hover:text-white transition">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
