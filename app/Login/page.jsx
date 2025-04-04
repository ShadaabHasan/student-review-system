'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  // const element = document.documentElement;
  
  const {register, handleSubmit, formState: { errors },} = useForm();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    
    const email = e.target.email.value; // Get email input value
    const password = e.target.password.value; // Get password input value
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log("Logged in as:", role);
  
        if (role === "teacher") {
          window.location.href = "/Dashboard/Teacher";
        } else {
          window.location.href = "/Dashboard/Student";
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid credentials.");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#193341] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 placeholder-gray-300 text-white rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="your@email.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <br />
              {errors.email && errors.email.type === "required" && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-sm text-red-500">
                  This email is not valid.
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 placeholder-gray-300 text-white rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-[#8ab6dc]">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-[#1e1ea3] hover:bg-[#445e75] text-white font-medium py-2.5 rounded-lg transition-colors">
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?
            <a
              href="/SignUp"
              className="text-[#6b93b7] hover:text-[#4b6982] font-bold m-1"
            >
              Sign up
            </a>
          </div>
        </div>
        <div>
          <a
            href="/"
            className="font-md text-sm mt-2 underline dark:text-white"
          >
            Go back
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
