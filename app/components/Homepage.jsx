'use client'

import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

function Homepage() {
  return (
    <>
    <div className="min-h-screen bg-indigo-950 bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-screen font-poppins ">
        <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#aac2d8] via-[#738fa7] to-[#b7d0e6] bg-[200%_auto] bg-clip-text text-5xl pb-3 font-bold text-transparent">
          Students Feedback System
        </span>
        <div className="text-lg text-[#a3a3a3]">
          <p>Feedback that drives change</p>
        </div>
        <p className="mt-4 mb-1 dark:text-slate-200 pb-3">Login as</p>
        
        <div className="flex flex-row items-center gap-2 ">
          <a href="/Login">
            <button className="py-1.5 px-5 text-xl flex flex-row justify-center items-center gap-2 rounded-full font-bold dark:text-[#a6c7e5] dark:hover:text-white  text-[#738fa7] border border-[#738fa7] hover:bg-[#5b7e9c] hover:text-white">
              <div>
                <FaChalkboardTeacher />
              </div>{" "}
              Teacher
            </button>
          </a>
          <a href="/Login">
            <button className="py-1.5 px-5 rounded-full  text-xl flex flex-row justify-center items-center gap-2 font-bold dark:text-[#a6c7e5] dark:hover:text-white text-[#738fa7] border border-[#738fa7]   hover:bg-[#5b7e9c] hover:text-white">
              <PiStudentFill className="font-bold" /> Student
            </button>
          </a>
        </div>
      </div>
      </div>
    </>
  );
}

export default Homepage;
