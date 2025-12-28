import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/products';

const Home = () => {
  const products = useMemo(() => getProducts(), []);

  // Highlight specific product (e.g., Sony FX3) - you can customize this
  const highlightedProductSlug = 'sony-fx3-full-frame-cinema-camera'; // Adjust based on your data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Camera Rental Catalog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Professional camera equipment for rent
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isHighlighted={product.slug === highlightedProductSlug}
          />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products available</p>
        </div>
      )}
    </div>
  );
};

export default Home;
