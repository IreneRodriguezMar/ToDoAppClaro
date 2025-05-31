// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    try {
      await register(form);
      alert("Registro exitoso. Ya puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error en el registro:", err);
      alert(
        "Error al registrarse. Asegúrate de que el usuario no esté repetido y la contraseña no esté vacía."
      );
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="form-login">
        <input
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
