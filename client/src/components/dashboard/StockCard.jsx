function StockCard({ name, price }) {
  return (
    <div className="stock-card">
      <h3>{name}</h3>
      <h2>${price}</h2>
    </div>
  );
}

export default StockCard;