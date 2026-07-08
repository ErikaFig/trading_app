import { useState } from "react";

function CreatePortfolioModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    nombre_portafolio: "",
    descripcion: "",
    balance: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onCreate({
      ...form,
      balance: Number(form.balance)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Crear Portafolio</h2>

        <input
          name="nombre_portafolio"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          onChange={handleChange}
        />

        <input
          name="balance"
          placeholder="Balance inicial"
          type="number"
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Crear</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePortfolioModal;