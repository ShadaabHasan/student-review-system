import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
      <div class="min-h-screen dark:bg-[#212231] bg-gray-100 flex flex-col items-center justify-center p-2">
        <div class="max-w-lg w-full bg-white dark:bg-slate-200 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign in
          </h2>

          <form class="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
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
              <label class="block text-sm font-medium text-gray-700 mb-1">
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
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                class="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="••••••••"
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
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                class="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#738fa7] focus:border-[#738fa7] outline-none transition-all"
                placeholder="••••••••"
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

            <button class="w-full bg-[#5b7e9c] hover:bg-[#445e75] text-white font-medium py-2.5 mt-2 rounded-lg transition-colors">
              Sign up
            </button>
          </form>

          <div class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <a
              href="/login"
              class="text-[#5b7e9c] hover:text-[#4b6982] font-bold m-1"
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
