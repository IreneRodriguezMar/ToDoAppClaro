import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUsername) {
      setUser({ username: storedUsername });
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
