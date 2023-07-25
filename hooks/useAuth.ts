import React, { useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";

import { getCookie, deleteCookie } from "cookies-next";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  //sign in function
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password }
      );

      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
      handleClose();
      //console.log(response);
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  //sign up function
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { firstName, lastName, email, phone, password, city }
      );

      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
      handleClose();
      //console.log(response);
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  //sign out
  const signout = () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
