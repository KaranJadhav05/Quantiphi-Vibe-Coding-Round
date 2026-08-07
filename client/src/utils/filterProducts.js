export function filterProducts(products, filters = {}) {
  const normalizedProducts = Array.isArray(products) ? products : [];
  const categories = Array.isArray(filters.categories)
    ? filters.categories
    : [];
  const priceRange = filters.priceRange || {};
  const minRating =
    typeof filters.minRating === "number" ? filters.minRating : 1;

  const minPrice = Number.isFinite(priceRange.min) ? priceRange.min : 40;
  const maxPrice = Number.isFinite(priceRange.max) ? priceRange.max : 1000;

  if (
    categories.length === 0 &&
    minRating === 1 &&
    minPrice === 40 &&
    maxPrice === 1000
  ) {
    return normalizedProducts;
  }

  return normalizedProducts.filter((product) => {
    const productCategory = product?.category;
    const productPrice = Number(product?.price);
    const productRating = Number(product?.rating);

    const matchesCategory =
      categories.length === 0 || categories.includes(productCategory);

    const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

    const matchesRating = productRating >= minRating;

    return matchesCategory && matchesPrice && matchesRating;
  });
}

export function sortProducts(products, sortOption = "default") {
  const normalizedProducts = Array.isArray(products) ? [...products] : [];

  if (sortOption === "price-asc") {
    return normalizedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortOption === "rating-desc") {
    return normalizedProducts.sort(
      (a, b) => Number(b.rating) - Number(a.rating),
    );
  }

  return normalizedProducts;
}
