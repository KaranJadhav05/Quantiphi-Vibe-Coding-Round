import { useMemo, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import CartPage from "./CartPage";
import { products } from "../data/products";
import { filterProducts, sortProducts } from "../utils/filterProducts";

const categories = ["Electronics", "Apparel", "Footwear"];

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 40, max: 1000 });
  const [minRating, setMinRating] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      categories: selectedCategories,
      priceRange,
      minRating,
    });

    return sortProducts(filtered, sortOption);
  }, [selectedCategories, priceRange, minRating, sortOption]);

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
    setSortOption("default");
  };

  const addToCart = (product) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, nextQuantity) => {
    setCartItems((current) => {
      if (nextQuantity <= 0) {
        return current.filter((item) => item.id !== productId);
      }

      return current.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      );
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showCartPage) {
    return (
      <CartPage
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onBack={() => setShowCartPage(false)}
      />
    );
  }

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
          <div className="content__actions">
            <label className="sort-control">
              <span>Sort by</span>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="rating-desc">Top Rated First</option>
              </select>
            </label>
            <div className="content__actions">
              <button
                className="cart-badge"
                onClick={() => setShowCartPage(true)}
              >
                Cart ({totalItems})
              </button>
              <span className="results-count">
                {filteredProducts.length} items
              </span>
            </div>
          </div>
        </div>

        <ProductList
          products={filteredProducts}
          onReset={resetFilters}
          onAddToCart={addToCart}
          cartItems={cartItems}
        />
      </main>
    </div>
  );
}

export default HomePage;
