import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { registerRequest } from "../api/authApi";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      if (
        !form.nombre ||
        !form.correo ||
        !form.password ||
        !form.confirmPassword
      ) {
        alert("Completa todos los campos");
        return;
      }

      if (form.password !== form.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const payload = {
        nombre: form.nombre,
        correo: form.correo,
        password: form.password
      };

      const res = await registerRequest(payload);

      console.log(res.data);
      alert("Usuario registrado correctamente");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error al registrarse");
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
          <h2>Crear cuenta</h2>
          <p>Únete y comienza a invertir</p>

          <Input
            label="Nombre completo"
            placeholder="Tu nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <Input
            label="Correo electrónico"
            placeholder="correo@email.com"
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

          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="********"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

	<Button
    	   text="Registrarse"
    	   onClick={handleRegister}	
	/>		
      

          <p style={{ marginTop: "20px" }}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
