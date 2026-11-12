import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Card from "./components/card";
import { useLayoutEffect ,useRef} from "react";
import { products, ProductCard } from "./components/product";
import "./App.css";

             
 function App() {

   const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("low");
  const [selectedId, setSelectedId] = useState(null);

  const selectedRef = useRef(null);

  console.log("RENDER: App");

  // 1. Filter by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // 2. Sort without modifying original products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;

    return a.name.localeCompare(b.name);
  });

  // 3. Find selected product using stable ID
  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  // 4. Handle selection from child component
  function handleSelect(product) {
    console.log("CLICK:", product.name);
    setSelectedId(product.id);
  }

  // 5. Observe DOM after React commits
  useLayoutEffect(() => {
    console.log("COMMIT:", selectedRef.current?.textContent);
  }, [selectedId, sortOrder, search, category]);

   return (
    <div className="container">
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

        {/* Testing missing data */}
        <Card />

      </div>
   




  

  
    
      <div className="container">
      <h1>Product List</h1>

      {/* Search and Filters */}
      <div className="filter-panel">

        <input
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-row">

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

        </div>
      </div>

      <p className="results-count">
        {sortedProducts.length} products found
      </p>

      {/* Products or Empty State */}
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
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleSelect}
              isSelected={selectedId === product.id}
            />
          ))}
        </div>
      )}
        
      {/* Selected Product */} 
      
      <div className="selected-panel" ref={selectedRef}>  
        <h2>Selected Product</h2>

        {selectedProduct ? (
          <>
            <p>Name: {selectedProduct.name}</p>
            <p>
              Price: Rs.{" "}
              {selectedProduct.price.toLocaleString("en-PK")}
            </p>
          </>
        ) : (
          <p>No product selected</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;



export function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log("Before:", count);

    setCount(count + 1);

    console.log("After:", count);
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}