function PortfolioCard({ portfolio, onView }) {
  return (
    <div className="portfolio-card">

      <h3>{portfolio.nombre_portafolio}</h3>

      <p>{portfolio.descripcion}</p>

      <h2>
        ${Number(portfolio.balance).toFixed(2)}
      </h2>

      <div className="portfolio-profit">

        <span>Ganancia realizada</span>

        <h3>
          +$
          {Number(portfolio.ganancia_total || 0).toFixed(2)}
        </h3>

      </div>

      <button
        className="sell-btn"
        onClick={() => onView(portfolio)}
      >
        Ver Portafolio
      </button>

    </div>
  );
}

export default PortfolioCard;
