import { useEffect, useState } from "react";
import {
  getPortfolios,
  createPortfolio
} from "../../../services/portfolioService";
import { getPortfolioStocks } from "../../../services/portfolioStocksService";
import PortfolioCard from "../PortfolioCard";
import CreatePortfolioModal from "../CreatePortfolioModal";

function PortfolioView({ setActiveView }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await getPortfolios();
      setPortfolios(data.portfolios);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePortfolio = async (portfolioData) => {
    try {
      await createPortfolio(portfolioData);

      setShowModal(false);
      await loadPortfolios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewPortfolio = async (portfolio) => {
    try {
      const data = await getPortfolioStocks(
        portfolio.id_portafolio
      );

      setSelectedPortfolio(portfolio);
      setPortfolioStocks(data.stocks);
      setShowPortfolioModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToSell = () => {

    setShowPortfolioModal(false);

    setActiveView("sell");

  };

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div>
      <div className="portfolio-header">
        <h1>Mis Portafolios</h1>

        <button
          className="create-btn"
          onClick={() => setShowModal(true)}
        >
          + Crear Portafolio
        </button>
      </div>

      <div className="portfolio-grid">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id_portafolio}
            portfolio={portfolio}
            onView={handleViewPortfolio}
          />
        ))}
      </div>

      {showModal && (
        <CreatePortfolioModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreatePortfolio}
        />
      )}

      {showPortfolioModal && selectedPortfolio && (
        <div className="portfolio-modal">
          <div className="portfolio-modal-content">
            <h2>{selectedPortfolio.nombre_portafolio}</h2>

            <p className="portfolio-balance">
              Balance: ${selectedPortfolio.balance}
            </p>

            <h3 className="portfolio-actions-title">
              Acciones
            </h3>

            {portfolioStocks.length === 0 ? (
              <p>No hay acciones compradas</p>
            ) : (
              <div className="portfolio-modal-actions">
                {portfolioStocks.map((stock) => (
                  <div
                    key={stock.id}
                    className="portfolio-stock-card"
                  >
                    <h4>{stock.simbolo}</h4>

                    <p>
                      Cantidad: {stock.cantidad}
                    </p>

                    <p>
                      Precio promedio:
                      ${stock.precio_promedio_compra}
                    </p>

                    <p>
                      Invertido:
                      ${stock.inversion_total}
                    </p>

                    <button
                      className="sell-btn"
                      onClick={handleGoToSell}
                    >
                      Vender
                    </button>

                  </div>
                ))}
              </div>
            )}

            <button
              className="close-portfolio-btn"
              onClick={() => setShowPortfolioModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioView;