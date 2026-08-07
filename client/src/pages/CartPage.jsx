import { useMemo } from "react";

function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onBack }) {
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <div>
          <p className="eyebrow">Shopping cart</p>
          <h1>Your Cart</h1>
        </div>
        <button className="reset-button" onClick={onBack}>
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <section className="empty-state">
          <h2>Your cart is empty.</h2>
          <p>Add products from the catalog to start your order.</p>
        </section>
      ) : (
        <>
          <section className="cart-page__list">
            {cartItems.map((item) => (
              <article key={item.id} className="cart-page__item">
                <div className="cart-page__details">
                  <h3>{item.name}</h3>
                  <p>${item.price} each</p>
                </div>
                <div className="cart-page__controls">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="cart-summary cart-summary--large">
            <div className="cart-total">
              <span>Total Items</span>
              <strong>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </strong>
            </div>
            <div className="cart-total">
              <span>Total Purchase</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default CartPage;
