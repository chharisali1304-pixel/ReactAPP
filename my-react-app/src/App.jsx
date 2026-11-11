import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Card from "./components/card";
import "./App.css";


const products = [
  { id: 1, name: "Laptop", price: 85000, category: "Electronics" },
  { id: 2, name: "Shoes", price: 5000, category: "Fashion" },
  { id: 3, name: "Mobile", price: 45000, category: "Electronics" },
  { id: 4, name: "T-Shirt", price: 2000, category: "Fashion" },
  { id: 5, name: "Headphones", price: 8000, category: "Electronics" },
];

function App() {

  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("low");

  const filteredProducts = products
    .filter((product) =>
      category === "All" || product.category === category
    )
    .sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : b.price - a.price
    );
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
   




  

  
    
      <h1>Product List</h1>

      <div className="controls">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Products</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Rs. {product.price.toLocaleString()}</p>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
