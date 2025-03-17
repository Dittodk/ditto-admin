// context/MyContext.tsx
'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface MyContextType {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
