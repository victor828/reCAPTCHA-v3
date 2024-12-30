import { createContext, useState } from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
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

  const registerUser = (user: User) => {
    setUsers([...users, user]);
  };

  const loginUser = (email: string, password: string) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  return (
    <UsersContext.Provider value={{ users, user, registerUser, loginUser }}>
      {children}
    </UsersContext.Provider>
  );
};
