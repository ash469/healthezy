'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    login as apiLogin,
    signup as apiSignup,
    getCurrentUser,
    logout as apiLogout,
    isAuthenticated as checkAuth,
    updateUser as apiUpdateUser
} from '@/services/auth';
import type { UserProfile, LoginRequest, SignupRequest } from '@/services/auth/types';

interface AuthContextType {
    user: UserProfile | null;
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (userData: SignupRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    updateUser: (userId: number, data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from API on mount if token exists
    useEffect(() => {
        const initAuth = async () => {
            if (checkAuth()) {
                try {
                    const userProfile = await getCurrentUser();
                    setUser(userProfile);
                } catch (error) {
                    console.error('Error loading user profile:', error);
                    // Clear invalid token
                    apiLogout();
                }
            }
            setIsLoading(false);
        };

        const timer = setTimeout(() => {
            initAuth();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            // Login and get token
            await apiLogin(credentials);

            // Fetch user profile
            const userProfile = await getCurrentUser();
            setUser(userProfile);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (userData: SignupRequest) => {
        try {
            await apiSignup(userData);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const userProfile = await getCurrentUser();
            setUser(userProfile);
        } catch (error) {
            console.error('Error refreshing user:', error);
            throw error;
        }
    };

    const updateUser = async (userId: number, updateData: any) => {
        try {
            const updatedProfile = await apiUpdateUser(userId, updateData);
            setUser(updatedProfile);
        } catch (error) {
            console.error(`Error updating user ${userId}:`, error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            isAuthenticated: !!user,
            isLoading,
            refreshUser,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
