import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface CurrencySettings {
  currency: string;
  symbol: string;
  isPrefix: boolean;
  setCurrency: (currency: string) => void;
  setSymbol: (symbol: string) => void;
  setIsPrefix: (isPrefix: boolean) => void;
}

const CurrencyContext = createContext<CurrencySettings | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [isPrefix, setIsPrefix] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedCurrency = await SecureStore.getItemAsync('currency');
        const savedSymbol = await SecureStore.getItemAsync('symbol');
        const savedIsPrefix = await SecureStore.getItemAsync('isPrefix');

        if (savedCurrency) setCurrency(savedCurrency);
        if (savedSymbol) setSymbol(savedSymbol);
        if (savedIsPrefix !== null) setIsPrefix(savedIsPrefix === 'true');
      } catch (error) {
        console.error('Failed to load currency settings:', error);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await SecureStore.setItemAsync('currency', currency);
      await SecureStore.setItemAsync('symbol', symbol);
      await SecureStore.setItemAsync('isPrefix', isPrefix.toString());
    } catch (error) {
      console.error('Failed to save currency settings:', error);
    }
  };

  useEffect(() => {
    saveSettings();
  }, [currency, symbol, isPrefix]);

  return (
    <CurrencyContext.Provider
      value={{ currency, symbol, isPrefix, setCurrency, setSymbol, setIsPrefix }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
