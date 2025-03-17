// context/MyProvider.tsx
'use client';
import React, { useState, ReactNode } from 'react';
import MyContext, { MyContextType } from './MyContext';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [state, setState] = useState<number>(1);

  const contextValue: MyContextType = {
    state,
    setState,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyProvider;
