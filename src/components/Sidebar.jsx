import {
  BarChart2,
  Crown,
  ShoppingCart,
  Package,
  MessageSquare,
  Settings
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h1 className="logo">Dabang</h1>

      <nav className="menu">
        <SidebarItem
          icon={<BarChart2 />}
          label="Dashboard"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
        />

        <SidebarItem
          icon={<Crown />}
          label="Leaderboard"
        />

        <SidebarItem
          icon={<ShoppingCart />}
          label="Order"
        />

        {/* product page navigate */}
        <SidebarItem
          icon={<Package />}
          label="Products"
          active={location.pathname === "/products/"}
          onClick={() => navigate("/products/")}
        />

        <SidebarItem
          icon={<BarChart2 />}
          label="Sales Report"
        />

        <SidebarItem
          icon={<MessageSquare />}
          label="Messages"
        />

        <SidebarItem
          icon={<Settings />}
          label="Settings"
        />
      </nav>

      <div className="pro-card">
        <h3>Dabang Pro</h3>
        <p>Get access to premium features</p>
        <button>Get Pro</button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      className={`menu-item ${active ? "active" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
