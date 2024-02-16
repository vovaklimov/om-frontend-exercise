import { createStore } from 'zustand';

export interface AuthenticationState {
  loggedIn: boolean;
}

export interface AuthenticationActions {
  login: () => void;
  logout: () => void;
}

export interface AuthenticationStore extends AuthenticationState {
  actions: AuthenticationActions;
}

export const defaultState: AuthenticationState = {
  loggedIn: false,
};

export const createAuthenticationStore = (initialState: AuthenticationState = defaultState) => {
  return createStore<AuthenticationStore>()((set) => ({
    ...initialState,
    actions: {
      login: () => set({ loggedIn: true }),
      logout: () => set({ loggedIn: false }),
    },
  }));
};
