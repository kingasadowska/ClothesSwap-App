import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
