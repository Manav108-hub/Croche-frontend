import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';
import { authApi } from '../../utils/api';
import { auth } from '../../utils/auth';
import { Toast} from '../ui/Toast';
import type{ ToastType } from '../ui/Toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: ToastType; message: string } | null>(null);

  const minPrice = Math.min(...product.prices.map(p => p.value));
  const mainImage = product.images[0]?.url;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setToastMessage({ type: 'warning', message: 'Please select a size first' });
      return;
    }

    try {
      setIsAdding(true);
      const user = auth.getUser();
      
      if (!user?.id) {
        setToastMessage({ type: 'error', message: 'Please login to add items to cart' });
        return;
      }

      await authApi.addToCart(product.id, selectedSize, 1);
      setToastMessage({ type: 'success', message: 'Added to cart successfully!' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart';
      setToastMessage({ type: 'error', message });
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
            <div className="flex flex-wrap gap-1">
              {product.prices.map((price, index) => (
                <button
                  key={`${product.id}-${price.size}-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(price.size);
                  }}
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${
                    selectedSize === price.size
                      ? 'bg-pink-100 text-pink-700 border-pink-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {price.size}
                </button>
              ))}
            </div>
            <span className="font-bold whitespace-nowrap">
              ₹{minPrice}
            </span>
          </div>
        </div>
      </a>
      
      <Button 
        variant="primary"
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
        disabled={isAdding || !selectedSize}
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

      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}
    </Card>
  );
};