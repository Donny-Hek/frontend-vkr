import React, { Component, createContext } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/auth';

const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    user: null,
    isAuthenticated: false,
    loading: true
    // err:null
  };

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userResponse = await this.fetchUser();
        this.setState({ 
          user: userResponse.data,
          isAuthenticated: true,
          loading: false
        });
      }
    } catch {
      // Убрали неиспользуемую переменную err
      this.setState({ loading: false });
    }
  };

  fetchUser = async () => {
    // Реализация запроса за данными пользователя
    return { data: { name: 'Test User', email: 'test@example.com' } };
  };
  
  login = async (credentials) => {
    const { accessToken, user } = await apiLogin(credentials);
    localStorage.setItem('accessToken', accessToken);
    this.setState({ user, isAuthenticated: true });
  };

  register = async (userData) => {
    const { accessToken, user } = await apiRegister(userData);
    localStorage.setItem('accessToken', accessToken);
    this.setState({ user, isAuthenticated: true });
  };

  logout = async () => {
    await apiLogout();
    this.setState({ user: null, isAuthenticated: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          register: this.register,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;