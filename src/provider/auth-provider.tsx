import { mockLogin } from '@/utils/mock';
import { createContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const login = (email: string, password: string) => {
    const user = mockLogin.find((user) => user.email === email && user.password === password);
    if (user) {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("role", user.acess)
      localStorage.setItem("name", user.name)
      toast.success("Login efetuado com sucesso!")
      return;
    }
    toast.error("Email ou senha inválidos")
  };
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem("isAuthenticated", "false")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};