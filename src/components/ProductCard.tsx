import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { formatCurrency, getProductImageUrl } from '../utils/products';

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
}

const ProductCard = ({ product, isHighlighted = false }: ProductCardProps) => {
  const mainImage = product.images?.[0]?.image || '';
  const imageUrl = mainImage ? getProductImageUrl(mainImage) : '';
  const pricePerDay = product.price || 0;
  const price3Days = pricePerDay * 2; // Assuming 3 days = 2x daily price

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`block rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 relative ${
        isHighlighted
          ? 'bg-gray-100 dark:bg-gray-800 shadow-md'
          : 'bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl'
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title || product.name}
            className="w-full h-full md:object-cover sm:object-fill"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3
          className={`text-base font-semibold line-clamp-2 ${
            isHighlighted
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {product.title || product.name}
        </h3>

        {/* Price */}
        <div className="space-y-1">
          <p
            className={`text-sm font-medium ${
              isHighlighted
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {formatCurrency(pricePerDay)} / day
          </p>
          <p
            className={`text-sm font-medium ${
              isHighlighted
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {formatCurrency(price3Days)} / 3 days
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

