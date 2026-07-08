function SellStockCard({
  stock,
  currentPrice,
  profit,
  onSell
}) {
  return (
    <div className="sell-card">

      <h2>{stock.simbolo}</h2>

      <p>
        <strong>Portafolio:</strong> {stock.nombre_portafolio}
      </p>

      <p>
        <strong>Cantidad:</strong> {stock.cantidad}
      </p>

      <p>
        <strong>Precio compra:</strong>{" "}
        ${Number(stock.precio_promedio_compra).toFixed(2)}
      </p>

      <p>
        <strong>Precio actual:</strong>{" "}
        {currentPrice !== undefined
          ? `$${Number(currentPrice).toFixed(2)}`
          : "Cargando..."}
      </p>

      <p>
        <strong>Ganancia estimada:</strong>{" "}
        {profit !== undefined ? (
          <span
            style={{
              color: profit >= 0 ? "#22c55e" : "#ef4444",
              fontWeight: "bold"
            }}
          >
            ${Number(profit).toFixed(2)}
          </span>
        ) : (
          "Calculando..."
        )}
      </p>

      <button onClick={onSell}>
        Vender
      </button>

    </div>
  );
}

export default SellStockCard;