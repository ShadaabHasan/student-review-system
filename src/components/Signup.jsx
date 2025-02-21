import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; 
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";


function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        role: data.role, 
        createdAt: new Date(),
      });
  
      console.log("User created:", user);
      alert("Signup successful!");
  
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  const password = getValues("password");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
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

  return (
    <>
      <div class="min-h-screen dark:bg-[#193341] bg-gray-100 flex flex-col items-center justify-center p-2">
        <div class="max-w-lg w-full bg-gray-800 dark:bg-[273444] rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">
            Sign up
          </h2>

          <form class="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
              {...register("role", { required: true })}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="Your name"
                {...register("name", { required: false })}
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
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
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="Confirm Password"
                {...register("cpassword", {
                  validate: (value) =>
                    password === value || "Passwords should match!",
                })}
              />
              <br />
              {errors.cpassword && (
                <span className="text-sm text-red-500">
                  {errors.cpassword.message}
                </span>
              )}
            </div>

            <button class="w-full bg-[#1e1ea3] hover:bg-[#445e75] text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign up
            </button>
          </form>

          <div class="mt-2 text-center text-sm text-gray-300">
            Already have an account?
            <a
              href="/login"
              class="text-[#f9f9f9] hover:text-[#4b6982] font-bold m-1"
            >
              Log in
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

export default Signup;
