"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// firebase auth comps
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

// react firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

// custom hooks
import postReq from "../../helpers/postReq";
import notif from "../../helpers/notif";

// icons
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const router = useRouter();
  const [userRegistrationData, setUserRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [operationLoading, setOperationLoading] = useState(false);

  // login/register with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // send request to the server
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
      };
      const serverAnswer = await postReq(userData, "/api/new-user");

      if (serverAnswer.code === "bad") {
        notif(serverAnswer.message);
      }

      if (serverAnswer.message === "ok") {
        notif("log in successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // register with email and password
  const handleRegistration = async (e) => {
    e.preventDefault();

    // chgeck if all inputs are filled
    if (
      !userRegistrationData.name ||
      !userRegistrationData.email ||
      !userRegistrationData.password
    ) {
      return notif("some inputs are empty");
    }

    // loader
    setOperationLoading(true);

    // register the user
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userRegistrationData.email,
        userRegistrationData.password
      );

      // send request to the server
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userRegistrationData.name,
      };
      const serverAnswer = await postReq(userData, "/api/new-user");

      if (serverAnswer.code === "bad") {
        notif(serverAnswer.message);
      }

      if (serverAnswer.message === "ok") {
        notif("log in successfully");
      }

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
              <Image src="/favicon.png" width={70} height={70} />
            </Link>
            <h2>Register an account</h2>
            <p>Create an accoun to have access to the platform</p>
          </div>

          <div className="clone-auth-providers">
            {loading ? (
              <div
                disabled
                className="clone-auth-single-provider btn btn-outline w-full loading"
              >
                <FcGoogle className="provider-logo" />
                <p> Continue with Google</p>
              </div>
            ) : (
              <div
                className="clone-auth-single-provider btn btn-outline w-full"
                onClick={googleLogin}
              >
                <FcGoogle className="provider-logo" />
                <p> Continue with Google</p>
              </div>
            )}
          </div>
        </div>

        <div className="clone-login-sep">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>

        {/* form */}
        <form onSubmit={handleRegistration}>
          <div className="clone-form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="name"
              value={userRegistrationData.name}
              onChange={(e) =>
                setUserRegistrationData({
                  ...userRegistrationData,
                  name: e.target.value,
                })
              }
            />
          </div>

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
                  email: e.target.value.trim().replaceAll(" ", ""),
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

          {operationLoading ? (
            <button className="btn btn-primary loading">Loading...</button>
          ) : (
            <button className="btn btn-primary">Register</button>
          )}
        </form>

        <div className="clone-more-options">
          <div>
            Already have an account?{" "}
            <p className="text-primary">
              <Link href="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
