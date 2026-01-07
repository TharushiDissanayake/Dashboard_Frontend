import React from "react";

const ProductRow = ({ id, name, percent, sales }) => {

  const getColor = (id) => {
    switch (id) {
      case "01": return "#3B82F6";
      case "02": return "#10B981";
      case "03": return "#8B5CF6";
      case "04": return "#F59E0B";
      default: return "#3B82F6";
    }
  };

  const isPositive = sales.startsWith("+");
  const color = getColor(id);

  return (
    <div className="top-product-row">

      {/* ID */}
      <span className="tp-id">{id}</span>

      {/* Name */}
      <span className="tp-name">{name}</span>

      {/* Popularity */}
      <div className="tp-progress">
        <div
          className="tp-progress-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>

      {/* Sales */}
      <span
        className={`tp-badge ${isPositive ? "positive" : "negative"}`}
      >
        {sales}
      </span>
    </div>
  );
};

export default ProductRow;
