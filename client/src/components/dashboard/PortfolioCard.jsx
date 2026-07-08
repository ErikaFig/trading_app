function PortfolioCard({ portfolio, onView }) {
  return (
    <div className="portfolio-card">
      <h3>{portfolio.nombre_portafolio}</h3>
      <p>{portfolio.descripcion}</p>
      <h2>${portfolio.balance}</h2>

      <button className="sell-btn" onClick={() => onView(portfolio)}>
        Ver Portafolio
      </button>
    </div>
  );
}

export default PortfolioCard;

 