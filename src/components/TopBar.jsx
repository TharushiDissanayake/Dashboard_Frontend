import { Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <div className="topbar">
      <h2>Dashboard</h2>

      <div className="topbar-right">
        <div className="search-box">
          <Search size={18} />
          <input placeholder="Search here..." />
        </div>

        <select>
          <option>Eng (US)</option>
        </select>

        <Bell />

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="user" />
          <div>
            <strong>Musfiq</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
