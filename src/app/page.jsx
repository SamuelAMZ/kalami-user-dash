"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// firebase auth comps
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

// react firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

// custom hooks
import notif from "../helpers/notif";

// icons
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const router = useRouter();
  const [userRegistrationData, setUserRegistrationData] = useState({
    email: "",
    password: "",
  });
  const [operationLoading, setOperationLoading] = useState(false);

  // login/register with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  // login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();

    // chgeck if all inputs are filled
    if (!userRegistrationData.email || !userRegistrationData.password) {
      return notif("some inputs are empty");
    }

    // loader
    setOperationLoading(true);

    // register the user
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userRegistrationData.email,
        userRegistrationData.password
      );

      notif("login successfully");

      setOperationLoading(false);
    } catch (error) {
      console.log(error.message);
      notif(
        error.message
          .replace("Firebase:", "")
          .replace("Error", "")
          .replace("(", "")
          .replace(")", "")
          .replace("auth", "")
          .replace("/", "")
          .replaceAll("-", " ")
      );
      setOperationLoading(false);
    }
  };

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      console.log(user);
      // redirect to dash
      window.location.href = `${process.env.NEXT_PUBLIC_CLIENT}/home`;
    }
  }, [user]);

  return (
    <div className="clonegpt-login-container">
      {/* clone-auth-header */}
      <div className="clonegpt-form-wrapper">
        {/* header */}
        <div className="auth-header">
          <div>
            <Link href="/">
              <Image src="/favicon.png" width={70} height={70} alt="logo" />
            </Link>
            <h2>Login to your account</h2>
            <p>Login to have access to the platform</p>
          </div>

          <div className="clone-auth-providers">
            <div
              className="clone-auth-single-provider btn btn-outline w-full"
              onClick={googleLogin}
            >
              <FcGoogle className="provider-logo" />
              <p> Continue with Google</p>
            </div>
          </div>
        </div>

        <div className="clone-login-sep">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <div className="clone-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="email"
              value={userRegistrationData.email}
              onChange={(e) =>
                setUserRegistrationData({
                  ...userRegistrationData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="clone-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="password"
              value={userRegistrationData.password}
              onChange={(e) =>
                setUserRegistrationData({
                  ...userRegistrationData,
                  password: e.target.value,
                })
              }
            />
          </div>

          <span className="forgot-password text-primary">
            <Link href="/forgot-password">Forgot password</Link>
          </span>

          {operationLoading ? (
            <button className="btn btn-primary loading">Loading...</button>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </form>

        <div className="clone-more-options">
          <div>
            Do not have an account?{"  "}
            <p className="text-primary">
              <Link href="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
