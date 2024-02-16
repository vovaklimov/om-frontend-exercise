'use client';

import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';
import { AuthenticationStore, createAuthenticationStore } from './authentication-store';

export const AuthenticationStoreContext = createContext<ReturnType<
  typeof createAuthenticationStore
> | null>(null);

export const AuthenticationStoreProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  /* 
    Ensure component is re-render-safe
    More info: https://docs.pmnd.rs/zustand/guides/nextjs#providing-the-store 
  */
  const storeRef = useRef(createAuthenticationStore());
  if (!storeRef.current) {
    storeRef.current = createAuthenticationStore();
  }

  return (
    <AuthenticationStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthenticationStoreContext.Provider>
  );
};

export const useAuthenticationStore = <T,>(selector: (store: AuthenticationStore) => T): T => {
  const store = useContext(AuthenticationStoreContext);

  if (!store) {
    throw new Error('useAuthenticationStore must be used within an AuthenticationStoreProvider');
  }

  return useStore(store, selector);
};

export const useAuthenticationStoreActions = () => {
  return useAuthenticationStore((store) => store.actions);
};

export const useIsLoggedIn = () => {
  return useAuthenticationStore((store) => store.loggedIn);
};
