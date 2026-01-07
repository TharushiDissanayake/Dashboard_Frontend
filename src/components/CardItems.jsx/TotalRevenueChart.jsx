import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Monday", online: 14000, offline: 12000 },
  { day: "Tuesday", online: 17000, offline: 11000 },
  { day: "Wednesday", online: 6000, offline: 22000 },
  { day: "Thursday", online: 16000, offline: 7000 },
  { day: "Friday", online: 12000, offline: 11000 },
  { day: "Saturday", online: 17000, offline: 13000 },
  { day: "Sunday", online: 21000, offline: 11000 }
];

export default function TotalRevenueChart() {
  return (
    <div className="revenue-chart">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={8}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="online" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="offline" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
