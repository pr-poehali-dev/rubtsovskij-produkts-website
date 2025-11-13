import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-white to-secondary py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxMmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAgMTJjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0xMi0yNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAgMTJjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wIDEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Icon name="Award" size={18} className="text-primary" />
              <span className="text-sm font-medium">Производитель с 1992 года</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Натуральные полуфабрикаты и колбасы
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Продукция высшего качества из отборного мяса. Современные технологии производства и контроль на каждом этапе.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate('catalog')} className="gap-2">
                <Icon name="ShoppingBag" size={20} />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('about')} className="gap-2">
                <Icon name="Info" size={20} />
                О производстве
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">30+</p>
                <p className="text-sm text-muted-foreground">лет опыта</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">видов продукции</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">довольных клиентов</p>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/5dab790e-de36-4bc3-86d2-a2c5ef916cd6/files/b95c48e7-eb72-463e-8a76-05962badce48.jpg"
                alt="Качественная продукция"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle2" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">100% натурально</p>
                  <p className="text-sm text-muted-foreground">Без добавок</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
