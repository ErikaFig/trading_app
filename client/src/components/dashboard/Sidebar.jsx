import { useNavigate } from "react-router-dom";

function Sidebar({
  activeView,
  setActiveView,
  menuOpen,
  setMenuOpen,
  isMobile
}) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (isMobile) {
      setMenuOpen(false);
    }

    navigate("/login");

  };

  const changeView = (view) => {

    setActiveView(view);

    if (isMobile) {
      setMenuOpen(false);
    }

  };

  return (

    <aside
      className={`sidebar ${isMobile ? (menuOpen ? "sidebar-open" : "") : ""}`}
    >

      <h2>TradeX</h2>

      <div className="menu">

        <button
          className={activeView === "buy" ? "active-btn" : ""}
          onClick={() => changeView("buy")}
        >
          Comprar
        </button>

        <button
          className={activeView === "sell" ? "active-btn" : ""}
          onClick={() => changeView("sell")}
        >
          Vender
        </button>

        <button
          className={activeView === "portfolio" ? "active-btn" : ""}
          onClick={() => changeView("portfolio")}
        >
          Portafolios
        </button>

      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Cerrar sesión
      </button>

    </aside>

  );

}

export default Sidebar;
