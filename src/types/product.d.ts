export interface Product {
    id: string;
    name: string;
    category: string;
    stock: number;
    description: string | null;
    prices: ProductPrice[];
    images: ProductImage[];
}

export interface ProductPrice {
    size: 'small' | 'medium' | 'large';
    value: number;
}

export interface ProductImage {
    id: string;
    url: string;
}