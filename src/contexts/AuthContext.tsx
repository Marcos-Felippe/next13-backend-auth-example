"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, setCookie } from 'cookies-next';
import { createSession } from "@/services/api";


type User = {
    id: string;
}

type SingIndata = {
    email: string;
    password: string;
}

type AuthContextType = {
    authenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (data: SingIndata) => Promise<{error: string | null; success: boolean}>;
    logout: () => void;
}

// Criando um context
export const AuthContext = createContext({} as AuthContextType);

// Criandoas regras de negocio, conteudo provido e o provider do context
export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificando se tem algum usuario salvo localmente (logado)
    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if(recoveredUser) {
            const userParsed = JSON.parse(recoveredUser);
            setUser({
                id: userParsed.id
            });
        }

        setLoading(false);
    }, []);

    const login = async ({email, password}: SingIndata) => {

        try {
            const response = await createSession({email, password});
            const loggedUserId = response.data.userId;
            const token = response.data.token;
            const error = response.data.error;

            if(!token || error){
                return {
                    success: false,
                    error: `${response.data.message.data} - ${response.data.message.status}`
                }
            }


            // Salvando o user localmente e o token nos cookies
            const userLocal = {
                id: loggedUserId,
                email: email
            }
            localStorage.setItem("user", JSON.stringify(userLocal));

            setCookie("nextauth.token", token, { maxAge: 60 * 60 * 1 });

            setUser({
                id: loggedUserId
            });

            return {
                success: true,
                error: null
            }

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            }
        }
    }

    const logout = () => {

        // Deletando o user localmente e o token nos cookies
        deleteCookie("nextauth.token");

        setUser(null);

        localStorage.removeItem("user");
    }

    // Retornando o context provider com os valores-conteudos a serem passados-utilizados adiante
    return (
        <AuthContext.Provider value={{
            authenticated: !!user, user, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    // Custom hook to use auth context
    try {
        const context = useContext(AuthContext);
        if (!context) {
            console.log('useAuth must be used within an AuthProvider');
            throw new Error('useAuth must be used within an AuthProvider')
        }

        return context;
    } catch (error: any) {

        console.log(error.message);
        return {
            user: null,
            logout: null,
            login: () => {
                return {
                    success: false,
                    error: `${error.message} - ${500}`
                }
            },
            loading: false,
            authenticated: false
        }
    }
}