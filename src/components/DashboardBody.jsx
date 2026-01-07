import StatCard from "./StatCard";
import Card from "./Card";
import ProductRow from "./CardItems.jsx/ProductRow";
import TotalRevenueChart from "./CardItems.jsx/TotalRevenueChart";
import CustomerSatisfaction from "./CardItems.jsx/CustomerSatisfaction";
import TargetVsReality from "./CardItems.jsx/TargetVsReality";

export default function DashboardBody() {
  return (
    <>
      {/* Today's Sales Section */}
      <section className="sales-summary">
        <div className="summary-header">
          <div>
            <h3>Today's Sales</h3>
            <p>Sales Summary</p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Sales"
            value="$1k"
            change="+8% from yesterday"
            color="pink"
            trend="down"
          />
          <StatCard
            title="Total Order"
            value="300"
            change="+5% from yesterday"
            color="orange"
            trend="down"
          />
          <StatCard
            title="Product Sold"
            value="5"
            change="+1.2% from yesterday"
            color="green"
            trend="up"
          />
          <StatCard
            title="New Customers"
            value="8"
            change="+0.5% from yesterday"
            color="purple"
            trend="down"
          />
        </div>
      </section>

      {/* Middle Analytics Row  */}
      <div className="grid-3">
        <Card title="Total Revenue">
          <TotalRevenueChart />
        </Card>

        <Card>
          <CustomerSatisfaction />
        </Card>
        
        <Card>
          <TargetVsReality />
        </Card>
      </div>

      {/* Bottom Section        */}
      <div className="grid-3">
        {/* Top Products */}
        <Card title="Top Products">
          <div className="top-products-table">

            {/* Header */}
            <div className="top-products-header">
              <span>#</span>
              <span>Name</span>
              <span>Popularity</span>
              <span>Sales</span>
            </div>

            {/* Rows */}
            <ProductRow
              id="01"
              name="Home Decor Range"
              percent={85}
              sales="+45%"
            />
            <ProductRow
              id="02"
              name="Disney Princess Pink Bag 18"
              percent={70}
              sales="+29%"
            />
            <ProductRow
              id="03"
              name="Bathroom Essentials"
              percent={45}
              sales="+18%"
            />
            <ProductRow
              id="04"
              name="Apple Smartwatches"
              percent={30}
              sales="+5%"
            />
          </div>
        </Card>

        {/* Sales Mapping */}
        <Card title="Sales Mapping by Country">
          <div className="placeholder">World Map</div>
        </Card>

        {/* Volume vs Service */}
        <Card title="Volume vs Service Level">
          <div className="placeholder">Volume Chart</div>
        </Card>
      </div>
    </>
  );
}