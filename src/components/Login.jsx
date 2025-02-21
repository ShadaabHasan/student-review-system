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
  const navigate = useNavigate();
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");


  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  const element = document.documentElement;
  
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

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
          window.location.href = "/teacherdashboard";
        } else {
          window.location.href = "/studentdashboard";
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid credentials.");
    }
  };
  return (
    <>
      <div class="min-h-screen dark:bg-[#193341] bg-gray-100 flex flex-col items-center justify-center p-4">
        <div class="max-w-md w-full bg-gray-800 dark:bg-[273444] rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">
            Login
          </h2>

          <form class="space-y-4" onSubmit={handleLogin}>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
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
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
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

            <div class="flex items-center justify-between">
              <a href="#" class="text-sm text-[#8ab6dc]">
                Forgot password?
              </a>
            </div>

            <button class="w-full bg-[#1e1ea3] hover:bg-[#445e75] text-white font-medium py-2.5 rounded-lg transition-colors">
              Login
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-300">
            Don't have an account?
            <a
              href="/signup"
              class="text-[#6b93b7] hover:text-[#4b6982] font-bold m-1"
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
        <div className="absolute bottom-8 right-6 text-xl md:right-6 ">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />
            {theme === "dark" ? (
              //sun
              <svg
                className="swap-on h-8 w-8 fill-current dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              //moon
              <svg
                className="swap-off  h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </label>
        </div>
      </div>
    </>
  );
}

export default Login;
