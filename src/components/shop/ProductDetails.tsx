import { useState } from 'react';
import { auth } from '../../utils/auth';
import { authApi } from '../../utils/api';
import { showToast } from '../ui/Toast';
import { Button } from '../ui/Button';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const prices = product.prices;
  
  // Find the selected price based on chosen size
  const selectedPrice = prices.find(p => p.size === selectedSize);
  // Display price will show selected price or lowest price if no selection
  const displayPrice = selectedPrice ? selectedPrice.value : Math.min(...prices.map(p => p.value));

  const handleAddToCart = async () => {
    const user = auth.getUser();
    if (!user?.id) {
      showToast({ type: 'error', message: 'Please login to add items to cart' });
      return;
    }

    if (!selectedSize) {
      showToast({ type: 'error', message: 'Please select a size first' });
      return;
    }

    try {
      setIsAdding(true);
      await authApi.addToCart(product.id, user.id, selectedSize, 1);
      showToast({ type: 'success', message: `${product.name} added to cart!` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart';
      showToast({ type: 'error', message });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-[7rem]">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery - unchanged */}
        <div className="grid gap-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[0]?.url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square bg-gray-100 rounded overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details - price display updated */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <p className="text-gray-600">
            {product.description || 'No description available.'}
          </p>

          {/* Updated price display that changes with size selection */}
          <div className="text-2xl font-bold">₹{displayPrice}</div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Sizes</h3>
            <div className="flex gap-2 flex-wrap">
              {prices.map((price) => (
                <Button
                  key={price.size}
                  variant={selectedSize === price.size ? 'primary' : 'outline'}
                  onClick={() => setSelectedSize(price.size)}
                  className="capitalize"
                >
                  {price.size}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full" 
            variant="primary"
            onClick={handleAddToCart}
            disabled={isAdding || !selectedSize}
          >
            {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;