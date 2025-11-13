import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  weight: string;
  image: string;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-white">Новинка</Badge>
          )}
          {product.discount && (
            <Badge variant="destructive">-{product.discount}%</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-semibold text-lg text-foreground line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Package" size={16} />
            <span>{product.weight}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          {product.discount ? (
            <>
              <span className="text-lg font-bold text-primary">{finalPrice} ₽</span>
              <span className="text-sm text-muted-foreground line-through">
                {product.price} ₽
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground">{product.price} ₽</span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => onAddToCart(product)}
          className="gap-2 transition-all hover:gap-3"
        >
          <Icon name="ShoppingCart" size={16} />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
