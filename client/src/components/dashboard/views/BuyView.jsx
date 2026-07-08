import { useEffect, useState } from "react";

import { getStocks, searchStock } from "../../../services/stockService";
import { getPortfolios } from "../../../services/portfolioService";
import { buyStock } from "../../../services/buyService";

import StockMarketCard from "../StockMarketCard";

function BuyView() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStock, setSelectedStock] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState("");

  const [cantidad, setCantidad] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStocks();
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await getPortfolios();
      setPortfolios(data.portfolios);
    } catch (error) {
      console.error("Error cargando portafolios:", error);
    }
  };

  const loadStocks = async () => {
    try {
      const data = await getStocks();

      const formattedStocks = data.symbol.map((symbol, index) => ({
        symbol,
        ask: data.ask[index],
        bid: data.bid[index],
        last: data.last[index],
        change: data.change[index],
        changepct: data.changepct[index],
        volume: data.volume[index]
      }));

      setStocks(formattedStocks);
    } catch (error) {
      console.error("Error cargando stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const data = await searchStock(search);

      const stock = {
        symbol: data.symbol[0],
        ask: data.ask[0],
        bid: data.bid[0],
        last: data.last[0],
        change: data.change[0],
        changepct: data.changepct[0],
        volume: data.volume[0]
      };

      const exists = stocks.some(
        (s) => s.symbol === stock.symbol
      );

      if (!exists) {
        setStocks((prev) => [...prev, stock]);
      }

      setSearch("");
    } catch (error) {
      console.error(error);
      alert("No se encontró esa acción.");
    }
  };

  const handleBuy = async () => {
    if (!selectedPortfolio || !cantidad) {
      alert("Selecciona un portafolio y una cantidad.");
      return;
    }

    try {
      await buyStock({
        id_portafolio: Number(selectedPortfolio),
        simbolo: selectedStock.symbol,
        cantidad: Number(cantidad),
        precio_compra: selectedStock.last
      });

      alert("Compra realizada correctamente.");

      setShowBuyModal(false);
      setCantidad("");
      setSelectedPortfolio("");

    } catch (error) {
      console.error(error);
      alert("Error al realizar la compra.");
    }
  };

  if (loading) {
    return <h2>Cargando mercado...</h2>;
  }

  return (
    <div>

      <h1>Comprar Acciones</h1>

      <div className="search-stock">

        <input
          type="text"
          placeholder="Buscar símbolo (AAPL, TSLA, AMZN...)"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toUpperCase())
          }
        />

        <button onClick={handleSearch}>
          Buscar
        </button>

      </div>

      <div className="stocks-market-grid">

        {stocks.map((stock) => (

          <StockMarketCard
            key={stock.symbol}
            stock={stock}
            onBuy={() => {
              setSelectedStock(stock);
              setShowBuyModal(true);
            }}
          />

        ))}

      </div>

      {showBuyModal && selectedStock && (

        <div className="buy-modal">

          <div className="buy-modal-content">

            <h2>
              Comprar {selectedStock.symbol}
            </h2>

            <p>
              Precio actual:
              <strong> ${selectedStock.last}</strong>
            </p>

            <select
              value={selectedPortfolio}
              onChange={(e) =>
                setSelectedPortfolio(e.target.value)
              }
            >

              <option value="">
                Selecciona un portafolio
              </option>

              {portfolios.map((portfolio) => (

                <option
                  key={portfolio.id_portafolio}
                  value={portfolio.id_portafolio}
                >
                  {portfolio.nombre_portafolio}
                </option>

              ))}

            </select>

            <input
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) =>
                setCantidad(e.target.value)
              }
            />

            <div className="buy-buttons">

              <button
                className="confirm-btn"
                onClick={handleBuy}
              >
                Confirmar compra
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowBuyModal(false)
                }
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default BuyView;