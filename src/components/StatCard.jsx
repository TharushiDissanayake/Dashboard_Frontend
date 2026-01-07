export default function StatCard({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>
      <span>+8% from yesterday</span>
    </div>
  );
}
