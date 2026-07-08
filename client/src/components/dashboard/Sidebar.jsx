import { useNavigate } from "react-router-dom";

function Sidebar({ activeView, setActiveView }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>TradeX</h2>

      <div className="menu">
        <button
          className={activeView === "buy" ? "active-btn" : ""}
          onClick={() => setActiveView("buy")}
        >
          Comprar
        </button>

        <button
          className={activeView === "sell" ? "active-btn" : ""}
          onClick={() => setActiveView("sell")}
        >
          Vender
        </button>

        <button
          className={activeView === "portfolio" ? "active-btn" : ""}
          onClick={() => setActiveView("portfolio")}
        >
          Portafolio
        </button>
      </div>

      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;