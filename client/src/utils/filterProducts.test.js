import test from "node:test";
import assert from "node:assert/strict";
import { filterProducts } from "./filterProducts.js";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 899, rating: 4.8 },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 120,
    rating: 4.2,
  },
  { id: 3, name: "Wool Sweater", category: "Apparel", price: 80, rating: 3.7 },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    price: 699,
    rating: 4.5,
  },
];

test("filters products by category, price range, and minimum rating", () => {
  const result = filterProducts(products, {
    categories: ["Electronics"],
    priceRange: { min: 100, max: 1000 },
    minRating: 4,
  });

  assert.deepEqual(
    result.map((product) => product.id),
    [1, 4],
  );
});

test("returns no products when no filters match", () => {
  const result = filterProducts(products, {
    categories: ["Apparel"],
    priceRange: { min: 100, max: 200 },
    minRating: 5,
  });

  assert.equal(result.length, 0);
});

test("returns the full catalog when all filters are cleared", () => {
  const result = filterProducts(products, {
    categories: [],
    priceRange: { min: 40, max: 1000 },
    minRating: 1,
  });

  assert.equal(result.length, products.length);
});
