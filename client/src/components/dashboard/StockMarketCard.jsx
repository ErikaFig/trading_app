function StockMarketCard({ stock, onBuy}) {
  return (
    <div className="stock-market-card">
      <h2>{stock.symbol}</h2>

      <p>
        Último precio: <strong>${stock.last}</strong>
      </p>

      <p>
        Cambio:{" "}
        <strong>
          {stock.change} ({(stock.changepct * 100).toFixed(2)}%)
        </strong>
      </p>

      <p>
        Volumen: {stock.volume.toLocaleString()}
      </p>

      <button onClick={onBuy}> 
        Comprar
      </button>

    </div>
  );
}

export default StockMarketCard;