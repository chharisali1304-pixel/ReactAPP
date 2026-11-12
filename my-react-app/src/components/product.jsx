const products = [
  { id: 1, name: "Laptop", price: 85000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 45000, category: "Electronics" },
  { id: 3, name: "Headphones", price: 8000, category: "Electronics" },
  { id: 4, name: "Shoes", price: 5000, category: "Fashion" },
  { id: 5, name: "T-Shirt", price: 2000, category: "Fashion" }
];

function ProductCard({ product, onSelect, isSelected }) {
  console.log("RENDER ProductCard:", product.name);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Rs. {product.price.toLocaleString("en-PK")}</p>
      <span>{product.category}</span>

      <button
        onClick={() => {
          console.log("CLICK:", product.name);
          onSelect(product);
        }}
        aria-pressed={isSelected}
      >
        {isSelected ? "Selected ✓" : "Select Product"}
      </button>
    </div>
  );
}

export { products, ProductCard };
