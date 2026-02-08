'use client';

import MarketplaceAPI, { type Product as ApiProduct, ProductCategory } from '@/lib/api/marketplace';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Loader2, Search, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  vendor: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

// Transform API product to frontend format
function transformProduct(apiProduct: ApiProduct): Product {
  const vendorName = apiProduct.vendor
    ? `${apiProduct.vendor.firstName || ''} ${apiProduct.vendor.lastName || ''}`.trim() || apiProduct.vendor.username
    : 'Unknown Vendor';

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    vendor: vendorName,
    price: apiProduct.price,
    rating: apiProduct.rating || 0,
    reviews: apiProduct.reviewCount || 0,
    image: apiProduct.imageUrl || 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=450&fit=crop',
    category: apiProduct.category,
  };
}

export default function CustomerMarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<string[]>([]);

  const categories = ['All', 'SUPPLEMENTS', 'EQUIPMENT', 'ACCESSORIES', 'APPAREL', 'OTHER'];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters: any = {};
        if (selectedCategory !== 'All') {
          filters.category = selectedCategory as ProductCategory;
        }
        if (searchTerm) {
          filters.search = searchTerm;
        }

        const apiProducts = await MarketplaceAPI.getAllProducts(filters);
        const transformedProducts = apiProducts.map(transformProduct);
        setProducts(transformedProducts);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">
            Shop fitness products and supplements
          </p>
        </div>
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-primary absolute right-3 top-3" />
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cart.length}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="p-4 border-destructive/20 bg-destructive/10">
          <p className="text-destructive font-medium">Error</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </Card>
      )}

      <Card className="p-4 border-border/50">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category === 'SUPPLEMENTS' ? 'Supplements' :
                 category === 'EQUIPMENT' ? 'Equipment' :
                 category === 'ACCESSORIES' ? 'Accessories' :
                 category === 'APPAREL' ? 'Apparel' :
                 category === 'OTHER' ? 'Other' : category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="border-border/50 overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="p-4 pb-3 bg-muted/30">
              <div className="aspect-4/3 overflow-hidden rounded-lg border border-border/40 bg-background">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.vendor}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="text-lg font-bold text-primary">
                  GH₵{product.price.toFixed(2)}
                </p>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </Card>
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {products.length === 0
              ? 'No products available at the moment.'
              : 'No products found matching your criteria.'}
          </p>
        </div>
      )}
    </div>
  );
}
