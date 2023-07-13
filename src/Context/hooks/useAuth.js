import { useState, useEffect } from 'react';

import api from '../../api';
import history from '../../history';

// componente que define como é feito o cadastro e logout da aplicação

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      api.defaults.headers.Authorization = `${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(dataLogin) {
      const { data: { token, user } } = await api.post('/login', dataLogin)
      api.defaults.headers.Authorization = `${token}`;
      localStorage.setItem('id', JSON.stringify(user.id));
      localStorage.setItem('token', JSON.stringify(token));
      setAuthenticated(true);
      history.push('/home');


  }
  async function handleSignUp(dataSignUp) {
    try {
      const { data: { token, user } } = await api.post('/users', dataSignUp)
      api.defaults.headers.Authorization = `${token}`;
      console.log(user.id)
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('id', JSON.stringify(user.id));
      setAuthenticated(true);
      history.push('/home');
    } catch (error) {
      console.log(error)
    }


  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout, handleSignUp };
}