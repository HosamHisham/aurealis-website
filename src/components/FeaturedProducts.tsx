'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import type { Product, ProductError } from '@/types/products';

interface FeaturedProductsProps {
  products: Product[];
  error?: ProductError | null;
}

export default function FeaturedProducts({ products, error }: FeaturedProductsProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    if (product.stock_quantity < 1) {
      console.error('Product out of stock:', product.id);
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1,
    });
  };

  if (error) {
    return (
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl text-navy mb-4">Luxury Essentials</h2>
          <div className="bg-pearl/50 p-8 rounded-lg shadow-luxury">
            <p className="text-plum font-medium mb-2">{error.message}</p>
            {error.details && (
              <p className="text-warm-gray text-sm font-light">{error.details}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="font-serif text-4xl text-navy mb-4">Luxury Essentials</h2>
        <p className="text-warm-gray font-light max-w-2xl mx-auto">
          Discover our most coveted formulations, crafted with rare ingredients and innovative technology.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product) => (
          <div key={product.id} className="group relative animate-slide-up">
            <div className="group-hover:shadow-gold transition-shadow duration-500">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-pearl shadow-luxury relative">
                <div className="relative h-96">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-8 text-center relative">
                <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-serif text-xl text-navy">{product.name}</h3>
                  <p className="text-warm-gray text-sm mt-2 font-light tracking-wide">{product.category}</p>
                  <p className="mt-3 text-lg font-accent text-gold">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-6 w-full bg-navy text-pearl px-6 py-4 font-medium hover:bg-plum transition-all duration-300 shadow-luxury relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 group-hover/btn:text-gold transition-colors duration-300 font-accent tracking-wide">
                    Add to Collection
                  </span>
                  <div className="absolute inset-0 bg-navy transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
