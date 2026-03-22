import { createContext, useContext, useState, type ReactNode } from 'react';

interface MockDataContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MockDataContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
