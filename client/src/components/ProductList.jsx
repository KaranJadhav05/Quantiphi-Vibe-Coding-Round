function ProductList({ products, onReset }) {
  if (products.length === 0) {
    return (
      <section className="empty-state">
        <h2>No items match your criteria.</h2>
        <button className="reset-button" onClick={onReset}>
          Reset filters
        </button>
      </section>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-card__body">
            <h3>{product.name}</h3>
            <div className="product-meta">
              <span className="price">${product.price}</span>
              <span className="rating">{product.rating.toFixed(1)} ★</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ProductList;
