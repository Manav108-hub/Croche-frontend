// CartComponent.tsx
import React, { useEffect, useState } from 'react';
import type { Cart } from '../../types/cart';
import { getCart } from '../../utils/api';
import { auth } from '../../utils/auth';

export const CartComponent: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = auth.getUser();
        if (!user) {
          setError('Please log in to view your cart');
          setIsLoading(false);
          return;
        }

        const cartData = await getCart(user.id);
        setCart(cartData);
      } catch (err) {
        setError('Failed to load cart');
        console.error('Error fetching cart:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="text-center py-8">Your cart is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex border rounded-lg p-4 gap-4">
            <div className="w-24 h-24">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${cart.total.toFixed(2)}</span>
        </div>
        
        <button
          className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => {/* Add checkout logic */}}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};