"use client";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}
interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authstate, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  //get user details
  const fetchUser = async () => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });

    const jwt = getCookie("jwt");

    if (!jwt) {
      setAuthState({
        data: null,
        loading: false,
        error: null,
      });
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authstate, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
