
import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo
} from "react";

import Card from "./components/card";
import Cart from "./components/cart";

import {
  products as initialProducts,
  ProductCard
} from "./components/product";
import FormComparison from "./components/FormComparison";
import "./App.css";

export default function App() {

  // PRODUCT STATE
  const [products, setProducts] = useState(() =>
    initialProducts.map(p => ({ ...p }))
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("low");
  const [selectedId, setSelectedId] = useState(null);

  // CART STATE
  // Store only product ID and quantity.
  const [cart, setCart] = useState([]);

  // COUNTER STATE
  const [count, setCount] = useState(0);

  const selectedRef = useRef(null);

  const nextId = useRef(
    Math.max(0, ...initialProducts.map(p => p.id)) + 1
  );

  console.log("RENDER: App");

  // FILTER PRODUCTS
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // SORT WITHOUT MUTATING ORIGINAL ARRAY
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  // LOOK UP PRODUCTS BY ID
  const productById = useMemo(
    () => new Map(products.map(p => [p.id, p])),
    [products]
  );

  const selectedProduct = productById.get(selectedId);

  // CREATE DISPLAY ITEMS FROM CURRENT PRODUCT DATA
  const cartItems = useMemo(
    () =>
      cart.flatMap(item => {
        const product = productById.get(item.productId);

        return product
          ? [{ ...product, quantity: item.quantity }]
          : [];
      }),
    [cart, productById]
  );

  // PRODUCT SELECTION
  function handleSelect(product) {
    console.log("CLICK:", product.name);
    setSelectedId(product.id);
  }

  // CREATE PRODUCT
  function handleAddProduct() {
    const id = nextId.current++;

    const newProduct = {
      id,
      name: `New Product ${id}`,
      price: 1000,
      category: "Electronics"
    };

    setProducts(prev => [...prev, newProduct]);
  }

  // UPDATE PRODUCT PRICE
  function handleUpdatePrice(id) {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, price: product.price + 1000 }
          : product
      )
    );
  }

  // DELETE PRODUCT
  function handleDeleteProduct(id) {
    setProducts(prev =>
      prev.filter(product => product.id !== id)
    );

    setCart(prev =>
      prev.filter(item => item.productId !== id)
    );

    setSelectedId(prev => prev === id ? null : prev);
  }

  // RESET PRODUCTS AND CART
  function handleResetProducts() {
    setProducts(initialProducts.map(p => ({ ...p })));
    setSearch("");
    setCategory("All");
    setSortOrder("low");
    setSelectedId(null);
    setCart([]);

    nextId.current =
      Math.max(0, ...initialProducts.map(p => p.id)) + 1;
  }

  // =====================================
  // CART FUNCTIONS
  // =====================================

  // ADD: Use spread or map
  function handleAddToCart(productId) {
    setCart(prev => {
      const exists = prev.some(
        item => item.productId === productId
      );

      if (exists) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        { productId, quantity: 1 }
      ];
    });
  }

  // CHANGE QUANTITY: Use map
  function handleChangeQuantity(productId, change) {
    setCart(prev =>
      prev.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + change
              )
            }
          : item
      )
    );
  }

  // REMOVE: Use filter
  function handleRemoveFromCart(productId) {
    setCart(prev =>
      prev.filter(item => item.productId !== productId)
    );
  }

  function handleClearCart() {
    setCart([]);
  }

  // COUNTER FUNCTIONS
  function handleIncreaseCount() {
    console.log("Before:", count);
    setCount(prev => prev + 1);
    console.log("After:", count);
  }

  function handleResetCounter() {
    setCount(0);
  }

  // OBSERVE COMMIT
  useLayoutEffect(() => {
    console.log(
      "COMMIT:",
      selectedRef.current?.textContent
    );
  }, [selectedId, products, sortOrder, search, category, cart]);

  return (
    <div className="container">

      {/* TEAM PROFILES */}
      <section>
        <h1>Team Profiles</h1>

        <div className="card-container">
          <Card name="Ali" age={22} role="Frontend Developer">
            <p>Ali specializes in React development.</p>
          </Card>

          <Card name="Ahmed" age={25} role="Backend Developer">
            <p>Ahmed works with databases and APIs.</p>
          </Card>

          <Card name="Sara" age={24} role="UI/UX Designer">
            <p>Sara creates user-friendly designs.</p>
          </Card>

          <Card />
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="product-section">
        <h1>Product List</h1>

        <div className="filter-panel">
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="All">All products</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort">Sort by</label>

              <select
                id="sort"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="product-controls">
          <button onClick={handleAddProduct}>
            + Add Product
          </button>

          <button onClick={handleResetProducts}>
            Reset Products
          </button>
        </div>

        <div className="catalog-layout">
          <div className="catalog-main">
            <p className="results-count">
              {sortedProducts.length} products found
            </p>

            {sortedProducts.length === 0 ? (
              <div className="empty-state">
                <h2>No products found</h2>
                <p>Try another search or category.</p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {sortedProducts.map(product => (
                  <div
                    className="catalog-product"
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      onSelect={handleSelect}
                      isSelected={selectedId === product.id}
                    />

                    <button
                      className="cart-add-button"
                      onClick={() =>
                        handleAddToCart(product.id)
                      }
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* SELECTED PRODUCT */}
            <div className="selected-panel" ref={selectedRef}>
              <h2>Selected Product</h2>

              {selectedProduct ? (
                <>
                  <p>Name: {selectedProduct.name}</p>

                  <p>
                    Price: Rs.{" "}
                    {selectedProduct.price.toLocaleString("en-PK")}
                  </p>

                  <div className="product-actions">
                    <button
                      onClick={() =>
                        handleUpdatePrice(selectedProduct.id)
                      }
                    >
                      Increase Price +1000
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProduct(selectedProduct.id)
                      }
                    >
                      Delete Product
                    </button>
                  </div>
                </>
              ) : (
                <p>No product selected</p>
              )}
            </div>
          </div>

          {/* SHOPPING CART */}
          <Cart
            items={cartItems}
            onIncrease={id =>
              handleChangeQuantity(id, 1)
            }
            onDecrease={id =>
              handleChangeQuantity(id, -1)
            }
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
          />
        </div>
      </section>

      {/* COUNTER */}
      <section className="counter-section">
        <h2>Counter</h2>
        <h3>Count: {count}</h3>

        <button onClick={handleIncreaseCount}>
          Increase
        </button>

        <button onClick={handleResetCounter}>
          Reset Counter
        </button>
      </section>

    </div>
  );
}
