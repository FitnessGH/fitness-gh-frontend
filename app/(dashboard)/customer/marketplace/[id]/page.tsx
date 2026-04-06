'use client';

import MarketplaceAPI, { type Product } from '@/lib/api/marketplace';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import {
  ArrowLeft,
  Heart,
  Loader2,
  MessageSquare,
  Package,
  Share2,
  ShoppingCart,
  Star,
  Store,
  Truck,
  Shield,
  RotateCcw,
  User,
  ThumbsUp,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Placeholder reviews — will come from a reviews API later
interface Review {
  id: string;
  author: string;
  avatar: string | null;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Kofi A.',
    avatar: null,
    rating: 5,
    date: '2 weeks ago',
    comment:
      'Excellent quality! Exactly what I needed for my home gym setup. The build quality is solid and it arrived well-packaged.',
    helpful: 12,
  },
  {
    id: '2',
    author: 'Ama B.',
    avatar: null,
    rating: 4,
    date: '1 month ago',
    comment:
      'Great product for the price. Shipping was fast and the vendor was very responsive to my questions.',
    helpful: 8,
  },
  {
    id: '3',
    author: 'Kwame M.',
    avatar: null,
    rating: 5,
    date: '1 month ago',
    comment:
      'I have been using this for a few weeks now and it has really helped improve my workout routine. Highly recommended!',
    helpful: 15,
  },
  {
    id: '4',
    author: 'Efua D.',
    avatar: null,
    rating: 3,
    date: '2 months ago',
    comment:
      'Decent product. It does the job, though the description could have been more accurate about the sizing.',
    helpful: 4,
  },
];

function StarRating({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass =
    size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : i < rating
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-12 text-muted-foreground text-right">{stars} star</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-muted-foreground text-right">{count}</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MarketplaceAPI.getProductById(productId);
        setProduct(data);
      } catch (err: any) {
        console.error('Failed to fetch product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading product…</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 space-y-4">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Card className="p-8 text-center border-destructive/20 bg-destructive/5">
          <p className="text-destructive font-medium text-lg">
            Product not found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const vendorName = product.vendor
    ? `${product.vendor.firstName || ''} ${product.vendor.lastName || ''}`.trim() ||
      product.vendor.username
    : 'Unknown Vendor';

  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;
  const reviews = PLACEHOLDER_REVIEWS;

  const categoryLabel =
    product.category === 'SUPPLEMENTS'
      ? 'Supplements'
      : product.category === 'EQUIPMENT'
        ? 'Equipment'
        : product.category === 'ACCESSORIES'
          ? 'Accessories'
          : product.category === 'APPAREL'
            ? 'Apparel'
            : product.category === 'OTHER'
              ? 'Other'
              : product.category;

  // Build image gallery from product images
  const images: string[] = [];
  if (product.imageUrl) images.push(product.imageUrl);
  if (Array.isArray(product.images)) {
    for (const img of product.images) {
      if (typeof img === 'string' && !images.includes(img)) images.push(img);
    }
  }
  if (images.length === 0) {
    images.push(
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=450&fit=crop',
    );
  }

  // Rating breakdown (placeholder distribution)
  const ratingBreakdown = [
    { stars: 5, count: Math.round(reviewCount * 0.55) },
    { stars: 4, count: Math.round(reviewCount * 0.25) },
    { stars: 3, count: Math.round(reviewCount * 0.12) },
    { stars: 2, count: Math.round(reviewCount * 0.05) },
    { stars: 1, count: Math.round(reviewCount * 0.03) },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Button>

      {/* Product main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div className="space-y-3">
          <Card className="overflow-hidden border-border/50">
            <div className="aspect-square bg-muted/30 relative">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all ${
                  isWishlisted
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-50'
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </Card>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImage
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-5">
          {/* Category badge */}
          <div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Rating summary */}
          <div className="flex items-center gap-3">
            <StarRating rating={rating} size="md" />
            <span className="text-sm text-muted-foreground">
              {rating > 0 ? rating.toFixed(1) : '0.0'} ({reviewCount}{' '}
              {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-primary">
              GH₵{product.price.toFixed(2)}
            </p>
            <span className="text-sm text-muted-foreground">
              {product.currency || 'GHS'}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Vendor info */}
          <Card className="p-4 border-border/50 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {product.vendor?.avatarUrl ? (
                  <img
                    src={product.vendor.avatarUrl}
                    alt={vendorName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Store className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {vendorName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Verified Seller
                </p>
              </div>
              <Button variant="outline" size="sm">
                Visit Store
              </Button>
            </div>
          </Card>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            {product.stock > 0 ? (
              <span className="text-sm">
                <span className="text-green-600 font-medium">In Stock</span>
                <span className="text-muted-foreground">
                  {' '}— {product.stock} available
                </span>
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity selector + Add to cart */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                className="px-3 py-2 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium border-x border-border min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                className="px-3 py-2 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <Button
              className="flex-1 gap-2 h-11"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart — GH₵{(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Share */}
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Truck, label: 'Fast Delivery' },
              { icon: Shield, label: 'Secure Payment' },
              { icon: RotateCcw, label: 'Easy Returns' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-[11px] text-muted-foreground font-medium text-center">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ratings & Reviews section */}
      <Card className="p-6 border-border/50">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-primary" />
          Ratings & Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Overall rating */}
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-5xl font-bold text-foreground">
              {rating > 0 ? rating.toFixed(1) : '—'}
            </p>
            <StarRating rating={rating} size="lg" />
            <p className="text-sm text-muted-foreground">
              Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating breakdown */}
          <div className="md:col-span-2 space-y-2">
            {ratingBreakdown.map((item) => (
              <RatingBar
                key={item.stars}
                stars={item.stars}
                count={item.count}
                total={reviewCount}
              />
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border/50 mb-6" />

        {/* Reviews list */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {review.author}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {review.comment}
                  </p>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors pt-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
              <div className="border-b border-border/30 pt-2" />
            </div>
          ))}
        </div>

        {/* Write review CTA */}
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Purchased this product? Share your experience!
          </p>
          <Button variant="outline" className="gap-2">
            <Star className="w-4 h-4" />
            Write a Review
          </Button>
        </div>
      </Card>

      {/* Product details / specs card */}
      {product.sku && (
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Product Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground">SKU</span>
              <span className="font-medium text-foreground">{product.sku}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium text-foreground">
                {categoryLabel}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-foreground">
                {product.status === 'ACTIVE' ? 'Available' : product.status}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground">Listed</span>
              <span className="font-medium text-foreground">
                {new Date(product.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
