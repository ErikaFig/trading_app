function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-header">
      <h1>Hola, {user?.nombre} 👋</h1>
      <p>Explora las mejores oportunidades del mercado</p>
    </div>
  );
}

export default Header;