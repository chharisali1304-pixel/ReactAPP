
import { useState } from "react";

export default function ControlledForm() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(name);
  }

  console.log("ControlledForm rendered");

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>

      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Live preview: {name}</p>

      <button type="submit">Submit</button>

      <p>Submitted: {submitted}</p>
    </form>
  );
}
