function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onReset,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h2>Filters</h2>
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <section className="filter-group">
        <h3>Category</h3>
        {categories.map((category) => (
          <label key={category} className="checkbox-row">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryToggle(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </section>

      <section className="filter-group">
        <h3>Price Range</h3>
        <div className="range-inputs">
          <label>
            <span>Min</span>
            <input
              type="range"
              min="40"
              max="1000"
              step="10"
              value={priceRange.min}
              onChange={(event) =>
                onPriceChange("min", Number(event.target.value))
              }
            />
          </label>
          <label>
            <span>Max</span>
            <input
              type="range"
              min="40"
              max="1000"
              step="10"
              value={priceRange.max}
              onChange={(event) =>
                onPriceChange("max", Number(event.target.value))
              }
            />
          </label>
        </div>
        <div className="price-values">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </section>

      <section className="filter-group">
        <h3>Minimum Rating</h3>
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="radio-row">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
              />
              <span>{rating}★ & up</span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default FilterSidebar;
