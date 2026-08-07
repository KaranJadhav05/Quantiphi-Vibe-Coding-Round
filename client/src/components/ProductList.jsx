function ProductList({
  products,
  onReset,
  onAddToCart,
  onUpdateQuantity,
  cartItems = [],
}) {
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
          <div className="product-card__image-wrap">
            <img src={product.image} alt={product.name} />
            {cartItems.some((item) => item.id === product.id) && (
              <span className="product-quantity-pill">
                {cartItems.find((item) => item.id === product.id)?.quantity ||
                  0}
              </span>
            )}
          </div>
          <div className="product-card__body">
            <h3>{product.name}</h3>
            <div className="product-meta">
              <span className="price">${product.price}</span>
              <span className="rating">{product.rating.toFixed(1)} ★</span>
            </div>
            <div className="card-actions">
              <button
                className="cart-button"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
              {cartItems.some((item) => item.id === product.id) && (
                <div className="quantity-control quantity-control--card">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        product.id,
                        (cartItems.find((item) => item.id === product.id)
                          ?.quantity || 1) - 1,
                      )
                    }
                  >
                    −
                  </button>
                  <span>
                    {cartItems.find((item) => item.id === product.id)
                      ?.quantity || 0}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        product.id,
                        (cartItems.find((item) => item.id === product.id)
                          ?.quantity || 0) + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ProductList;
