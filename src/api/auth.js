// # API взаимодействие с бэкендом
// # Авторизация/регистрация
// # Настройка axios
// # Запросы пользователя

import api from './axios';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials, {
    withCredentials: true
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData, {
    withCredentials: true
  });
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout', {}, {
    withCredentials: true
  });
  localStorage.removeItem('accessToken');
};