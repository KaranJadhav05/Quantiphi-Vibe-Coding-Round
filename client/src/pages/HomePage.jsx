import { useMemo, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import { products } from "../data/products";
import { filterProducts } from "../utils/filterProducts";

const categories = ["Electronics", "Apparel", "Footwear"];

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 40, max: 1000 });
  const [minRating, setMinRating] = useState(1);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      categories: selectedCategories,
      priceRange,
      minRating,
    });
  }, [selectedCategories, priceRange, minRating]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((current) => {
      if (type === "min") {
        return { ...current, min: Math.min(value, current.max) };
      }
      return { ...current, max: Math.max(value, current.min) };
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 40, max: 1000 });
    setMinRating(1);
  };

  return (
    <div className="app-shell">
      <FilterSidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        priceRange={priceRange}
        onPriceChange={handlePriceChange}
        minRating={minRating}
        onRatingChange={setMinRating}
        onReset={resetFilters}
      />
      <main className="content">
        <div className="content__header">
          <div>
            <p className="eyebrow">Marketplace browsing</p>
            <h1>Discover products with precision</h1>
          </div>
          <span className="results-count">{filteredProducts.length} items</span>
        </div>
        <ProductList products={filteredProducts} onReset={resetFilters} />
      </main>
    </div>
  );
}

export default HomePage;
