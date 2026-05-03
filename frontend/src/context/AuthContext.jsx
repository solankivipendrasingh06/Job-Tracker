import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL + '/api/auth/';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'register', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        toast.success('Registration successful');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      throw new Error(message);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(API_URL + 'login', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        toast.success('Logged in successfully');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
