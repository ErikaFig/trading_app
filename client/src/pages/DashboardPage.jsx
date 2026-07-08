import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import FeaturedCard from "../components/dashboard/FeaturedCard";
import StockCard from "../components/dashboard/StockCard";

import BuyView from "../components/dashboard/views/BuyView";
import SellView from "../components/dashboard/views/SellView";
import PortfolioView from "../components/dashboard/views/PortfolioView";

import "./Dashboard.css";

function DashboardPage() {
  const [activeView, setActiveView] = useState("buy");

  const renderView = () => {
    switch (activeView) {
      case "buy":
        return <BuyView />;

      case "sell":
        return <SellView />;

      case "portfolio":
        return (<PortfolioView 
                  setActiveView={setActiveView}
        /> );

      default:
        return <BuyView />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="dashboard-main">
        {renderView()}
      </div>
    </div>
  );
}

export default DashboardPage;