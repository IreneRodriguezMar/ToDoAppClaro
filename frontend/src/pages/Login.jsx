import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { login } from '../services/api';

const Login = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login(form);

      // Guardar en localStorage para persistencia
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username);

      // Actualizar el contexto
      setUser({ username: form.username });

      // Redirigir al dashboard
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className='form-login'>
        <input
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <button className="button" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
