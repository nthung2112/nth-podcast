import React, { createContext, useContext, useState } from 'react';
import { categories, podcasts } from './initial-state.json';
import { Category, Podcast } from '@/types';

interface AppStore {
  podcasts: Podcast[];
  categories: Category[];
}

// Create a new context
const AppContext = createContext<AppStore | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appStore] = useState<AppStore>({
    podcasts,
    categories,
  });

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

// Create a custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
