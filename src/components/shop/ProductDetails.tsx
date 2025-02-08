import { Button } from '../ui/Button';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const prices = product.prices;
  const minPrice = Math.min(...prices.map(p => p.value));
  const mainImage = product.images[0]?.url;

  return (
    <div className="max-w-7xl mx-auto px-4 py-[7rem]">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="grid gap-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={mainImage || '/placeholder.jpg'}
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

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <p className="text-gray-600">
            {product.description || 'No description available.'}
          </p>

          <div className="text-2xl font-bold">₹{minPrice}</div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Sizes</h3>
            <div className="flex gap-2 flex-wrap">
              {prices.map((price, index) => (
                <Button
                  key={`${product.id}-${price.size}-${index}`}
                  variant="outline"
                  className="capitalize"
                >
                  {price.size}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full" variant="primary">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;