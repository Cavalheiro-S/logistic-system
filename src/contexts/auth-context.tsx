import { useUser } from '@/hooks/queries/use-user';
import { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const { users } = useUser()
  const login = (email: string, password: string) => {
    const user = users?.find((user) => user.email === email && user.senha === password);
    if (user) {
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("role", user.acesso)
      localStorage.setItem("name", user.nome)
      toast.success("Login efetuado com sucesso!")
      return;
    }
    toast.error("Email ou senha inválidos")
  };
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem("isAuthenticated", "false")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};