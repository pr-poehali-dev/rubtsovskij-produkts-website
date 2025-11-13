import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (section: string) => void;
  cartItemsCount: number;
}

export default function Header({ onNavigate, cartItemsCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
    { id: 'about', label: 'О компании', icon: 'Info' },
    { id: 'recipes', label: 'Рецепты', icon: 'ChefHat' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Р</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground leading-tight">Рубцовский продукт</h1>
              <p className="text-xs text-muted-foreground">Качество проверенное временем</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('profile')}
            >
              <Icon name="User" size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-fade-in">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
