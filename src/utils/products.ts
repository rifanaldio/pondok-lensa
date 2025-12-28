import productsData from '../data/products.json';
import type { Product } from '../types/product';

export const getProducts = (): Product[] => {
  return productsData as Product[];
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const products = getProducts();
  return products.find((product) => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find((product) => product.id === id);
};

export const getProductImageUrl = (imageName: string): string => {
  // Vite serves files from public folder at root
  return `/products/${imageName}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
