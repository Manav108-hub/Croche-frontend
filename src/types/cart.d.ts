export type CartItem = {
    id: string;
    quantity: number;
    size: string;
    product: {
      id: string;
      name: string;
      prices: Array<{
        id: string;
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
  