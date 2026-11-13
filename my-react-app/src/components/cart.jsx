
const formatPrice = (price) =>
  `Rs. ${price.toLocaleString("en-PK")}`;

export default function Cart({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear
}) {
  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <div className="cart-header">
        <h2>Shopping Cart ({totalQuantity})</h2>

        <button
          type="button"
          onClick={onClear}
          disabled={items.length === 0}
        >
          Clear Cart
        </button>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add products to get started.</p>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(item => (
              <li className="cart-item" key={item.id}>
                <h3>{item.name}</h3>

                <p>{formatPrice(item.price)} each</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p>
                  Total: {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  className="remove-button"
                  type="button"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}
