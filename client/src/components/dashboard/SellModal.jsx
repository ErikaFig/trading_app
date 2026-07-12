import { useState } from "react";

function SellModal({
  stock,
  currentPrice,
  onSell,
  onClose
}) {

  const [cantidad, setCantidad] = useState("");

  // El usuario podrá modificar este precio
  const [precioVenta, setPrecioVenta] = useState(currentPrice);

  // Calcular ganancia/pérdida en tiempo real
  const ganancia =
    cantidad && precioVenta
      ? Number(cantidad) *
        (Number(precioVenta) -
          Number(stock.precio_promedio_compra))
      : 0;

  return (
    <div className="buy-modal">

      <div className="buy-modal-content">

        <h2>
          Vender {stock.simbolo}
        </h2>

        <p>
          <strong>Portafolio:</strong>{" "}
          {stock.nombre_portafolio}
        </p>

        <p>
          <strong>Precio promedio de compra:</strong>{" "}
          ${Number(stock.precio_promedio_compra).toFixed(2)}
        </p>

        <p>
          <strong>Precio actual del mercado:</strong>{" "}
          ${Number(currentPrice).toFixed(2)}
        </p>

        <label>
          <strong>Precio al que deseas vender</strong>
        </label>

        <input
          type="number"
          step="0.01"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(e.target.value)}
        />

        <button
          type="button"
          className="market-price-btn"
          onClick={() => setPrecioVenta(currentPrice)}
        >
          Usar precio del mercado
        </button>

        <label>
          <strong>Cantidad a vender</strong>
        </label>

        <input
          type="number"
          min="1"
          max={stock.cantidad}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <h3>Ganancia / Pérdida estimada</h3>

        <h2
          style={{
            color: ganancia >= 0 ? "#22c55e" : "#ef4444"
          }}
        >
          ${ganancia.toFixed(2)}
        </h2>

        <div className="buy-buttons">

          <button
            onClick={() =>
              onSell(
                Number(cantidad),
                Number(precioVenta)
              )
            }
          >
            Confirmar venta
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}

export default SellModal;