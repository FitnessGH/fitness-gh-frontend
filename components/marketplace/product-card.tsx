'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  vendor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  onAddToCart: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  vendor,
  price,
  rating,
  reviews,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="border-border/50 overflow-hidden hover:border-primary/50 transition-all group">
      <div className="p-4 pb-3 bg-muted/30 relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/40 bg-background">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart className="w-4 h-4 text-red-500 hover:fill-red-500" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="font-semibold text-foreground text-sm line-clamp-2">
            {name}
          </p>
          <p className="text-xs text-muted-foreground">{vendor}</p>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({reviews})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-lg font-bold text-primary">
            GH₵{price.toFixed(2)}
          </p>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
