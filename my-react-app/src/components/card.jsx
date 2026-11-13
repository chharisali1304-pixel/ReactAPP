function Card({
  name = "",
  age,
  role = "",
  children
}) {
  return (
    <div className="card">
      <h2>{name}</h2>

      <p>
        <strong>Age:</strong> {age ?? "Not available"}
      </p>
          
      <p>
        <strong>Role:</strong> {role}
      </p>

      <div className="card-description">
        {children ?? <p>No description available.</p>}
      </div>
    </div>
  );
}

export default Card;