
import { useState } from "react";

export default function Counter() {
  const [directCount, setDirectCount] = useState(0);
  const [functionalCount, setFunctionalCount] = useState(0);

  function handleDirect() {
    setDirectCount(directCount + 1);
    setDirectCount(directCount + 1);
    setDirectCount(directCount + 1);

    console.log("Current render:", directCount);
  }

  function handleFunctional() {
    setFunctionalCount(prev => prev + 1);
    setFunctionalCount(prev => prev + 1);
    setFunctionalCount(prev => prev + 1);

    console.log("Current render:", functionalCount);
  }

  function handleReset() {
    setDirectCount(0);
    setFunctionalCount(0);
  }

  return (
    <div>
      <h1>React State Queue</h1>

      <h2>Direct Count: {directCount}</h2>
      <button onClick={handleDirect}>
        Direct +3 Calls
      </button>

      <h2>Functional Count: {functionalCount}</h2>
      <button onClick={handleFunctional}>
        Functional +3 Calls
      </button>

      <hr />

      <button onClick={handleReset}>
        Reset Both
      </button>
    </div>
  );
}
export { Counter };