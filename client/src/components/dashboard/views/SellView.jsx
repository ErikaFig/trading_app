import { useEffect, useState } from "react";

import {
  getSellStocks,
  sellStock
} from "../../../services/sellService";

import { getStocks,  searchStock} from "../../../services/stockService";

import SellStockCard from "../SellStockCard";
import SellModal from "../SellModal";

function SellView() {

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [marketPrices, setMarketPrices] = useState({});

  const [selectedStock, setSelectedStock] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadStocks();

  }, []);

  const loadStocks = async () => {
    try {

      const data = await getSellStocks();

      setStocks(data.stocks);

      await loadMarketPrices(data.stocks);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const loadMarketPrices = async (stocksList) => {

    try {

      const prices = {};

      for (const stock of stocksList) {

        try {

          const data = await searchStock(stock.simbolo);
          console.log(stock.simbolo);
          console.log(data);

          prices[stock.simbolo] = data.last[0];

        } catch (error) {

          console.error(
            "No se pudo obtener precio de",
            stock.simbolo
          );

        }

      }

      setMarketPrices(prices);

    } catch (error) {

      console.error(error);

    }

  };

  const handleOpenSell = (stock, currentPrice) => {

    setSelectedStock({
      ...stock,
      currentPrice
    });

    setShowModal(true);

  };

  const handleSell = async (cantidad, precioVenta) => {

    try {

      await sellStock({

        id_portafolio: selectedStock.id_portafolio,
        simbolo: selectedStock.simbolo,
        cantidad,
        precio_venta: Number(precioVenta)

      });

      alert("Venta realizada correctamente");

      setShowModal(false);

      setSelectedStock(null);

      loadStocks();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error al vender"
      );

    }

  };

  if (loading) {
    return <h2>Cargando acciones...</h2>;
  }

  return (

    <div>

      <h1>Vender acciones</h1>

      <div className="stocks-market-grid">

        {stocks.map((stock) => {

          const currentPrice = marketPrices[stock.simbolo];

          const profit =
            currentPrice !== undefined
              ? (currentPrice - Number(stock.precio_promedio_compra)) *
              stock.cantidad
              : undefined;

          return (

            <SellStockCard

              key={stock.id}

              stock={stock}

              currentPrice={currentPrice}

              profit={profit}

              onSell={() =>
                handleOpenSell(stock, currentPrice)
              }

            />

          );

        })}

      </div>

      {showModal && selectedStock && (

        <SellModal

          stock={selectedStock}

          currentPrice={selectedStock.currentPrice}

          onSell={handleSell}

          onClose={() => {

            setShowModal(false);

            setSelectedStock(null);

          }}

        />

      )}

    </div>

  );

}

export default SellView;