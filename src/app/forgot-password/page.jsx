"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

// firebase auth comps
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase";

// custom hooks
import notif from "../../helpers/notif";

// icons
import { FcGoogle } from "react-icons/fc";

const ForgetPassword = () => {
  const router = useRouter();
  const [userRegistrationData, setUserRegistrationData] = useState({
    email: "",
  });
  const [operationLoading, setOperationLoading] = useState(false);

  // reset password func
  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    // check if all inputs are filled
    if (!userRegistrationData.email) {
      return notif("email input is empty");
    }

    setOperationLoading(true);

    try {
      const result = await sendPasswordResetEmail(
        auth,
        userRegistrationData.email
      );

      notif("reset email sent successfully");
      setOperationLoading(false);

      // redirect to login ForgetPassword
      router.push("/auth");
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
            <h2>Reset Password</h2>
          </div>
        </div>

        {/* form */}
        <form onSubmit={resetPasswordHandler}>
          <div className="clone-form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              id="email"
              type="text"
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

          {operationLoading ? (
            <button className="btn btn-primary loading">Loading...</button>
          ) : (
            <button className="btn btn-primary">Reset Password</button>
          )}
          <Link href="/" className=" w-full">
            <div className="btn btn-outline w-full">Back to login</div>
          </Link>
        </form>

        <div className="clone-more-options">
          <div>
            Do not have an account?{" "}
            <p className="text-primary">
              <Link href="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
