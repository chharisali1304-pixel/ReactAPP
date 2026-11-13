
import { useState } from "react";


// 1. CONTROLLED FORM

function ControlledForm({ onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSave("Controlled", {
      name: name.trim(),
      price: Number(price)
    });

    setName("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>

      <label htmlFor="controlled-name">
        Product Name
      </label>
      <input
        id="controlled-name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <label htmlFor="controlled-price">
        Price
      </label>
      <input
        id="controlled-price"
        type="number"
        min="1"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <p>Live preview: {name || "No product entered"}</p>

      <button type="submit">
        Save Product
      </button>
    </form>
  );
}

// ======================================
// 2. FORMDATA FORM
// ======================================
function FormDataForm({ onSave }) {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const product = {
      name: String(formData.get("name")).trim(),
      price: Number(formData.get("price"))
    };

    onSave("FormData", product);

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>FormData Form</h2>

      <label htmlFor="formdata-name">
        Product Name
      </label>
      <input
        id="formdata-name"
        type="text"
        name="name"
        required
      />

      <label htmlFor="formdata-price">
        Price
      </label>
      <input
        id="formdata-price"
        type="number"
        name="price"
        min="1"
        required
      />

      <button type="submit">
        Save Product
      </button>
    </form>
  );
}

// ======================================
// PARENT COMPONENT
// ======================================
export default function FormComparison() {
  const [submittedProduct, setSubmittedProduct] =
    useState(null);

  function handleSave(source, product) {
    setSubmittedProduct({ source, ...product });
  }

  return (
    <section>
      <h1>React Form Comparison</h1>

      <div className="forms-container">
        <ControlledForm onSave={handleSave} />
        <FormDataForm onSave={handleSave} />
      </div>

      {submittedProduct && (
        <div className="form-result" aria-live="polite">
          <h2>Submitted Product</h2>
          <p>Method: {submittedProduct.source}</p>
          <p>Name: {submittedProduct.name}</p>
          <p>Price: Rs. {submittedProduct.price}</p>
        </div>
      )}
    </section>
  );
}
