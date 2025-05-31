import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ToDo App</Link>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {user && (
          <>
            <li className="greeting">Hola, {user.username}</li>
            <li><button className="logout-button" onClick={handleLogout}>Cerrar sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
