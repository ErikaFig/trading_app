import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";

import BuyView from "../components/dashboard/views/BuyView";
import SellView from "../components/dashboard/views/SellView";
import PortfolioView from "../components/dashboard/views/PortfolioView";

import "./Dashboard.css";

function DashboardPage() {

  const [activeView, setActiveView] = useState("buy");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {

    const handleResize = () => {

      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (!mobile) {
        setMenuOpen(false);
      }

    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const handleChangeView = (view) => {

    setActiveView(view);

    if (isMobile) {
      setMenuOpen(false);
    }

  };

  const renderView = () => {

    switch (activeView) {

      case "buy":
        return <BuyView />;

      case "sell":
        return <SellView />;

      case "portfolio":
        return (
          <PortfolioView
            setActiveView={handleChangeView}
          />
        );

      default:
        return <BuyView />;

    }

  };

  return (

    <div className="dashboard-layout">

      {isMobile && (

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      )}

      <Sidebar
        activeView={activeView}
        setActiveView={handleChangeView}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isMobile={isMobile}
      />

      {isMobile && menuOpen && (

        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />

      )}

      <div className="dashboard-main">

        {renderView()}

      </div>

    </div>

  );

}

export default DashboardPage;
