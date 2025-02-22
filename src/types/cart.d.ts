export type CartItem = {
  id: string;
  quantity: number;
  size: string;
  product: {
    id: string;
    name: string;
    prices: Array<{
      size: string;
      value: number; // Added value field
    }>;
    images: Array<{
      id: string;
      url: string;
    }>;
  };
};

export type Cart = {
  id: string;
  items: CartItem[];
  total: number;
};