
import { useState } from "react";

export default function FormDataForm() {
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("productName");

    setSubmitted(name);
    form.reset();
  }

  console.log("FormDataForm rendered");

  return (
    <form onSubmit={handleSubmit}>
      <h2>FormData Form</h2>

      <input
        type="text"
        name="productName"
        placeholder="Product name"
      />

      <button type="submit">Submit</button>

      <p>Submitted: {submitted}</p>
    </form>
  );
}
