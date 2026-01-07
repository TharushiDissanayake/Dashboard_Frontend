import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components including Filler for area charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CustomerSatisfaction = () => {
  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Last Month",
        data: [2000, 2500, 1800, 1800, 2100, 2000, 2300],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: "This Month",
        data: [3000, 2800, 3200, 2900, 3300, 2700, 4504],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ": $" + context.parsed.y.toLocaleString();
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 1500,
        max: 5000,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ 
        fontSize: "18px", 
        fontWeight: "700", 
        marginBottom: "20px",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif"
      }}>
        Customer Satisfaction
      </h3>
      
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Line data={data} options={options} />
      </div>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
        fontSize: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            background: "#3B82F6" 
          }}></div>
          <span style={{ color: "#6b7280" }}>Last Month</span>
        </div>
        <span style={{ 
          fontSize: "14px", 
          fontWeight: "600", 
          color: "#1f2937" 
        }}>
          $3,004
        </span>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            borderRadius: "50%", 
            background: "#10B981" 
          }}></div>
          <span style={{ color: "#6b7280" }}>This Month</span>
        </div>
        <span style={{ 
          fontSize: "14px", 
          fontWeight: "600", 
          color: "#1f2937" 
        }}>
          $4,504
        </span>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;