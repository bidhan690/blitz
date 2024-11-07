"use client";
import { FC } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
}

const ProviderWrapper: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}   
    </SessionProvider>
  );
};

export default ProviderWrapper;
