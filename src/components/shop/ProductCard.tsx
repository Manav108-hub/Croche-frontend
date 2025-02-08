import React from 'react';
import type { Product } from '../../types/product';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const minPrice = Math.min(...product.prices.map(p => p.value));
  const mainImage = product.images[0]?.url;

  return (
    <Card className="group h-full flex flex-col transform transition-transform hover:-translate-y-1">
      <a href={`/products/${product.id}`} className="flex-grow">
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-64 object-cover border-b"
          />
        )}
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-lg font-medium line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {product.prices.map((price, index) => (
                <span 
                  key={`${product.id}-${price.size}-${index}`}
                  className="capitalize text-sm text-gray-600"
                >
                  {price.size}
                </span>
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
        className="w-full rounded-none flex items-center justify-center gap-2 pacifico-regular"
      >
        <Icon name="shoppingCart" className="w-5 h-5" />
        Add to Cart
      </Button>
    </Card>
  );
};