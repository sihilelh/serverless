import type { AuthUser } from "aws-amplify/auth";
import { create } from "zustand";

interface User extends AuthUser {
    groups: string[];
    isAdmin: boolean;
}

type AppStore = {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    clearError: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
    setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    clearError: () => set({ error: null }),
}));
