'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string | null;
  vendor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category?: string;
  onAddToCart: (id: string) => void;
  /** Base path for the detail page, defaults to /customer/marketplace */
  detailBasePath?: string;
}

export function ProductCard({
  id,
  name,
  description,
  vendor,
  price,
  rating,
  reviews,
  image,
  category,
  onAddToCart,
  detailBasePath = '/customer/marketplace',
}: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`${detailBasePath}/${id}`);
  };

  const categoryLabel =
    category === 'SUPPLEMENTS'
      ? 'Supplements'
      : category === 'EQUIPMENT'
        ? 'Equipment'
        : category === 'ACCESSORIES'
          ? 'Accessories'
          : category === 'APPAREL'
            ? 'Apparel'
            : category === 'OTHER'
              ? 'Other'
              : category;

  // Truncate description to ~80 chars
  const summary =
    description && description.length > 80
      ? `${description.slice(0, 80)}…`
      : description;

  return (
    <Card className="border-border/50 overflow-hidden hover:border-primary/50 transition-all group cursor-pointer flex flex-col">
      {/* Clickable image area */}
      <div
        className="p-4 pb-3 bg-muted/30 relative overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/40 bg-background">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <button
          className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4 text-red-500 hover:fill-red-500 transition-colors" />
        </button>
        {categoryLabel && (
          <span className="absolute top-6 left-6 px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold uppercase tracking-wider rounded-full z-10">
            {categoryLabel}
          </span>
        )}
      </div>

      {/* Clickable info area */}
      <div
        className="p-4 space-y-2.5 flex-1 flex flex-col"
        onClick={handleCardClick}
      >
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{vendor}</p>
          {summary && (
            <p className="text-xs text-muted-foreground/80 mt-1.5 line-clamp-2 leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : i < rating
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'text-muted-foreground/40'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {rating > 0 ? rating.toFixed(1) : '0.0'} ({reviews})
          </span>
        </div>
      </div>

      {/* Price + Add to cart — not clickable for navigation */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
          <p className="text-lg font-bold text-primary">
            GH₵{price.toFixed(2)}
          </p>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(id);
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
