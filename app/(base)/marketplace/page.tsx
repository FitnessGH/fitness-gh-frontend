'use client';

import MarketplaceAPI, { type Product as ApiProduct, ProductCategory } from '@/lib/api/marketplace';
import { ProductCard } from '@/components/marketplace/product-card';
import { ShoppingCart as ShoppingCartSheet } from '@/components/marketplace/shopping-cart';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Loader2, Search, ShoppingCart } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

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

function MarketplaceContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === productId);
        if (existing) {
          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [
          ...prev,
          {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      });
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 flex flex-col">
      <div className="p-6 flex-1">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                FitnessGH Marketplace
              </h1>
              <p className="text-muted-foreground">
                Discover premium fitness products and supplements
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </div>
              )}
            </button>
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

          <Card className="p-4 border-border/50 shadow-md">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {products.length === 0
                      ? 'No products available at the moment.'
                      : 'No products found matching your criteria.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ShoppingCartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={null}>
      <MarketplaceContent />
    </Suspense>
  );
}
