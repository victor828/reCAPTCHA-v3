import { createContext, useState } from "react";

interface User {
  id?: number;
  nombre: string;
  correo: string;
  fecha_nacimiento: Date;
  password: string;
}

export const UsersContext = createContext();

import { ReactNode } from "react";

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{ users, user, setUsers, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};
