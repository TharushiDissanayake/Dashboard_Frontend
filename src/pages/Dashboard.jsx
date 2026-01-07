import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardBody from "../components/DashboardBody";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar />
        <DashboardBody />
      </main>
    </div>
  );
}
