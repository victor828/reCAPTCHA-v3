import { createContext, useState } from "react";

interface User {
  nombre: string;

  correo: string;

  [key: string]: string | number | boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

export const UsersContext = createContext(defaultUserContext);

import { ReactNode } from "react";

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};
