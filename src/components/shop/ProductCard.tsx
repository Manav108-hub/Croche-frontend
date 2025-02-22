import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';
import { authApi } from '../../utils/api';
import { auth } from '../../utils/auth';
import { showToast } from '../ui/Toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const minPrice = Math.min(...product.prices.map(p => p.value));
  const mainImage = product.images[0]?.url;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const user = auth.getUser();
    if (!user?.id) {
      showToast({ type: 'error', message: 'Please login to add items to cart' });
      return;
    }

    try {
      setIsAdding(true);
      await authApi.addToCart(product.id, user.id, "small", 1);
      showToast({ type: 'success', message: `${product.name} added to cart!` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart';
      showToast({ type: 'error', message });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="group h-full flex flex-col transform transition-transform hover:-translate-y-1">
      <a href={`/products/${product.id}`} className="flex-grow">
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-64 object-cover border-b"
            loading="lazy"
          />
        )}
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-lg font-medium line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <div className="flex justify-between items-center gap-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              Size: Small
            </span>
            <span className="font-bold whitespace-nowrap">
              ₹{minPrice}
            </span>
          </div>
        </div>
      </a>
      
      <Button 
        variant="primary"
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full rounded-none flex items-center justify-center gap-2 pacifico-regular"
      >
        {isAdding ? (
          'Adding...'
        ) : (
          <>
            <Icon name="shoppingCart" className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </Button>
    </Card>
  );
};