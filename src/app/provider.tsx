'use client';
import { ReactNode } from "react";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';

export default function Provider({ children }: {children: ReactNode }) {
  return (
    <SessionProvider>
        <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  )
}
