import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

function Homepage() {
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
      <div class="absolute dark:bg-[#212231] top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(160,175,183,0.5),rgba(255,255,255,0))]"></div>
      <div className="flex flex-col items-center justify-center h-screen font-poppins ">
        <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#aac2d8] via-[#738fa7] to-[#b7d0e6] bg-[200%_auto] bg-clip-text text-3xl font-bold text-transparent">
          Students Feedback System
        </span>
        <div className="text-lg text-[#a3a3a3]">
          <p>Feedback that drives change</p>
        </div>
        <p className="mt-4 mb-1 dark:text-slate-200">Login as</p>
        <div className="flex flex-row items-center gap-2">
          <a href="/login">
            <button className="py-1.5 px-5 text-xl flex flex-row justify-center items-center gap-2 rounded-full font-bold dark:text-[#a6c7e5] dark:hover:text-white  text-[#738fa7] border border-[#738fa7] hover:bg-[#5b7e9c] hover:text-white">
              <div>
                <FaChalkboardTeacher />
              </div>{" "}
              Teacher
            </button>
          </a>
          <a href="/login">
            <button className="py-1.5 px-5 rounded-full  text-xl flex flex-row justify-center items-center gap-2 font-bold dark:text-[#a6c7e5] dark:hover:text-white text-[#738fa7] border border-[#738fa7]   hover:bg-[#5b7e9c] hover:text-white">
              <PiStudentFill className="font-bold" /> Student
            </button>
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
                className="swap-on h-8 w-8 fill-current text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              //moon
              <svg
                className="swap-off  h-8 w-8 fill-current dark:text-white"
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

export default Homepage;
