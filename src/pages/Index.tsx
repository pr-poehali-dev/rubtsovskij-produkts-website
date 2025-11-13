import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const products: Product[] = [
  {
    id: 1,
    name: 'Пельмени домашние',
    category: 'Полуфабрикаты',
    price: 450,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/21fd4593-d56f-4dff-bb16-6e486fd7c682.jpg',
    isNew: true,
  },
  {
    id: 2,
    name: 'Колбаса варёная "Докторская"',
    category: 'Колбасы',
    price: 380,
    weight: '500 г',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/b95c48e7-eb72-463e-8a76-05962badce48.jpg',
    discount: 15,
  },
  {
    id: 3,
    name: 'Сосиски молочные',
    category: 'Колбасы',
    price: 320,
    weight: '400 г',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/b95c48e7-eb72-463e-8a76-05962badce48.jpg',
  },
  {
    id: 4,
    name: 'Манты с мясом',
    category: 'Полуфабрикаты',
    price: 520,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/21fd4593-d56f-4dff-bb16-6e486fd7c682.jpg',
    isNew: true,
  },
  {
    id: 5,
    name: 'Салями "Столичная"',
    category: 'Колбасы',
    price: 680,
    weight: '500 г',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/b95c48e7-eb72-463e-8a76-05962badce48.jpg',
  },
  {
    id: 6,
    name: 'Котлеты рубленые',
    category: 'Полуфабрикаты',
    price: 390,
    weight: '600 г',
    image: 'https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/21fd4593-d56f-4dff-bb16-6e486fd7c682.jpg',
    discount: 10,
  },
];

const reviews = [
  { id: 1, name: 'Мария К.', rating: 5, text: 'Отличное качество продукции! Покупаем регулярно, всегда свежее и вкусное. Особенно нравятся пельмени.' },
  { id: 2, name: 'Алексей П.', rating: 5, text: 'Доставка быстрая, продукция натуральная. Рекомендую!' },
  { id: 3, name: 'Елена С.', rating: 5, text: 'Прекрасный производитель! Вся продукция высшего качества, цены приемлемые.' },
];

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
  status: 'delivered' | 'processing' | 'cancelled';
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders] = useState<Order[]>([
    {
      id: 1001,
      date: '2024-11-10',
      items: [
        { ...products[0], quantity: 2 },
        { ...products[1], quantity: 1 },
      ],
      total: 1280,
      status: 'delivered',
    },
    {
      id: 1002,
      date: '2024-11-08',
      items: [{ ...products[2], quantity: 3 }],
      total: 960,
      status: 'delivered',
    },
  ]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Добавлено в корзину',
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderHome = () => (
    <>
      <Hero onNavigate={setActiveSection} />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные товары</h2>
            <p className="text-muted-foreground">Выбор наших покупателей</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" onClick={() => setActiveSection('catalog')}>
              Смотреть весь каталог
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Award', title: 'Высшее качество', text: 'Только натуральное мясо и проверенные рецептуры' },
              { icon: 'ShieldCheck', title: 'Сертификация', text: 'Все продукты соответствуют ГОСТ и санитарным нормам' },
              { icon: 'Truck', title: 'Быстрая доставка', text: 'Доставим свежую продукцию в день заказа' },
            ].map((feature, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Каталог продукции</h2>
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Все товары</TabsTrigger>
            <TabsTrigger value="semifinished">Полуфабрикаты</TabsTrigger>
            <TabsTrigger value="sausages">Колбасы</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="semifinished" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter((p) => p.category === 'Полуфабрикаты').map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sausages" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter((p) => p.category === 'Колбасы').map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">О компании</h2>
          <div className="space-y-6">
            <img
              src="https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/784131af-606f-43f9-87a6-b62841d3f09a.jpg"
              alt="Производство"
              className="w-full h-96 object-cover rounded-lg"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              ООО "Рубцовский продукт" — ведущий производитель мясных полуфабрикатов и колбасных изделий с 1992 года. За 30 лет работы мы заслужили доверие тысяч покупателей благодаря неизменно высокому качеству продукции.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Наше производство оснащено современным оборудованием, что позволяет сохранять все полезные свойства натурального мяса. Мы используем только проверенное сырье от надежных поставщиков и строго контролируем каждый этап производства.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-primary" />
                    Наша миссия
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Обеспечивать покупателей качественной и безопасной продукцией, сохраняя традиции домашнего приготовления.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-primary" />
                    Наши ценности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Качество, честность, ответственность и забота о здоровье наших клиентов.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderRecipes = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Рецепты</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Пельмени со сметаной',
              time: '15 минут',
              difficulty: 'Легко',
              ingredients: ['Пельмени - 500г', 'Сметана - 200г', 'Зелень', 'Соль'],
              steps: [
                'Вскипятите воду в кастрюле, добавьте соль',
                'Опустите пельмени в кипящую воду',
                'Варите 7-10 минут после всплытия',
                'Подавайте со сметаной и зеленью',
              ],
            },
            {
              title: 'Котлеты с гарниром',
              time: '25 минут',
              difficulty: 'Средне',
              ingredients: ['Котлеты - 4 шт', 'Масло растительное', 'Картофель - 500г', 'Специи'],
              steps: [
                'Разогрейте сковороду с маслом',
                'Обжарьте котлеты по 5 минут с каждой стороны',
                'Отварите картофель',
                'Подавайте горячими с любимым гарниром',
              ],
            },
          ].map((recipe, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="ChefHat" size={16} />
                    {recipe.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ингредиенты:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Приготовление:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderDelivery = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Доставка и оплата</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" className="text-primary" />
                  Условия доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Бесплатная доставка</span>
                  <Badge>от 2000 ₽</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Стоимость доставки</span>
                  <span className="font-semibold">200 ₽</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Время доставки</span>
                  <span className="font-semibold">в день заказа</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" className="text-primary" />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Icon name="Banknote" size={20} className="text-primary" />
                    <span>Наличными курьеру</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                    <span>Картой курьеру</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <span>Онлайн-оплата на сайте</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="text-primary" />
                  Зона доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы осуществляем доставку по городу Рубцовску и в радиусе 15 км от города. Доставка производится ежедневно с 9:00 до 21:00.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );

  const renderReviews = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Отзывы покупателей</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Оставить отзыв
          </Button>
        </div>
      </div>
    </section>
  );

  const renderCart = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Корзина</h2>
        {cart.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-4">Корзина пуста</p>
              <Button onClick={() => setActiveSection('catalog')}>Перейти в каталог</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </Button>
                          <span className="font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.price * item.quantity} ₽</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товары ({cartItemsCount})</span>
                      <span className="font-semibold">{cartTotal} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="font-semibold">{cartTotal >= 2000 ? 'Бесплатно' : '200 ₽'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Всего</span>
                      <span className="font-bold">{cartTotal >= 2000 ? cartTotal : cartTotal + 200} ₽</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderProfile = () => (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Личный кабинет</h2>
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Мои заказы</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Заказ №{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.date).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      >
                        {order.status === 'delivered' ? 'Доставлен' : 'В обработке'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} шт × {item.price} ₽
                            </p>
                          </div>
                          <span className="font-semibold">{item.quantity * item.price} ₽</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого</span>
                        <span>{order.total} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Информация профиля</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <p className="text-muted-foreground">Иван Иванов</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">ivan@example.com</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Адрес доставки</label>
                  <p className="text-muted-foreground">г. Рубцовск, ул. Примерная, д. 1, кв. 1</p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setActiveSection} cartItemsCount={cartItemsCount} />
      
      {activeSection === 'home' && renderHome()}
      {activeSection === 'catalog' && renderCatalog()}
      {activeSection === 'about' && renderAbout()}
      {activeSection === 'recipes' && renderRecipes()}
      {activeSection === 'delivery' && renderDelivery()}
      {activeSection === 'reviews' && renderReviews()}
      {activeSection === 'cart' && renderCart()}
      {activeSection === 'profile' && renderProfile()}

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Рубцовский продукт</h3>
              <p className="text-sm text-gray-300">
                Качественная мясная продукция с 1992 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Полуфабрикаты</li>
                <li>Колбасы</li>
                <li>Новинки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+7 (999) 123-45-67</li>
                <li>info@rubtsovsk-product.ru</li>
                <li>г. Рубцовск</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-sm text-gray-300">
            © 2024 ООО "Рубцовский продукт". Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}