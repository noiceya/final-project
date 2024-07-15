import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type User = {
  name: string;
  pass: string;
  favorites: string[];
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  logout: () => void;
  toggleFavorite: (championId: string) => void;
}

const defaultContext: UserContextInterface = {
  user: {
    name: '',
    pass: '',
    favorites: [],
  },
  setUser: () => {},
  logout: () => {},
  toggleFavorite: (championId: string) => {},
};

export const UserContext = createContext<UserContextInterface>(defaultContext);

export type UserProviderProps = {
  children?: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(defaultContext.user);

  const logout = () => {
    setUser(defaultContext.user);
  };

  const toggleFavorite = (championId: string) => {
    const isFavorite = user.favorites.includes(championId);
    let updatedFavorites: string[];

    if (isFavorite) {
      updatedFavorites = user.favorites.filter((id) => id !== championId);
    } else {
      updatedFavorites = [...user.favorites, championId];
    }

    setUser((prevUser) => ({
      ...prevUser,
      favorites: updatedFavorites,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
