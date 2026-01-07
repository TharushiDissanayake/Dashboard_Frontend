import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const TargetVsReality = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
    datasets: [
      {
        label: "Reality Sales",
        data: [8500, 7800, 7500, 8200, 9200, 9000, 9100],
        backgroundColor: "#10B981",
        borderRadius: 8,
        barThickness: 12,
      },
      {
        label: "Target Sales",
        data: [10500, 9800, 11200, 10000, 12500, 12800, 13000],
        backgroundColor: "#EAB308",
        borderRadius: 8,
        barThickness: 12,
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ": " + context.parsed.y.toLocaleString();
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
          color: "#9CA3AF",
          font: {
            size: 12,
          }
        },
        border: {
          display: false,
        }
      },
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
        Target vs Reality
      </h3>
      
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Bar data={data} options={options} />
      </div>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        marginTop: "20px"
      }}>
        {/* Reality Sales */}
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          background: "#D1FAE5",
          borderRadius: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "rgba(16, 185, 129, 0.2)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div>
              <div style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: "#1f2937",
                marginBottom: "2px"
              }}>
                Reality Sales
              </div>
              <div style={{ 
                fontSize: "10px", 
                color: "#6b7280"
              }}>
                Global
              </div>
            </div>
          </div>
          <div style={{ 
            fontSize: "16px", 
            fontWeight: "700", 
            color: "#1f2937" 
          }}>
            8,823
          </div>
        </div>

        {/* Target Sales */}
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px",
          background: "#FEF3C7",
          borderRadius: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "rgba(234, 179, 8, 0.2)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2">
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
            </div>
            <div>
              <div style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: "#1f2937",
                marginBottom: "2px"
              }}>
                Target Sales
              </div>
              <div style={{ 
                fontSize: "10px", 
                color: "#6b7280"
              }}>
                Commercial
              </div>
            </div>
          </div>
          <div style={{ 
            fontSize: "16px", 
            fontWeight: "700", 
            color: "#1f2937" 
          }}>
            12,122
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetVsReality;