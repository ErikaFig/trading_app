import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { loginRequest } from "../api/authApi";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await loginRequest(form);

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-panel">
          <h1>TradeX</h1>
          <p>Invierte hoy, crece mañana.</p>
          <div className="bull-box">📈</div>
        </div>

        <div className="right-panel">
          <h2>Iniciar sesión</h2>
          <p>Bienvenido de nuevo</p>

          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            name="correo"
            value={form.correo}
            onChange={handleChange}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button 
	    text="Iniciar Sesión"
	    onClick={handleLogin}
	  />

          <p style={{ marginTop: "20px" }}>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
