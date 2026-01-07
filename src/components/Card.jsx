export default function Card({ title, children, height }) {
  return (
    <div className={`card ${height === "large" ? "large" : ""}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}