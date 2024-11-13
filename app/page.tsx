"use client"

import React, { useState } from "react";

import { glory } from "@/styles/fonts"

export default function Home() {
  const [buttonclicked,setbuttonclicked] = useState(false)

  function handlebuttonclicked(){
    setbuttonclicked(!buttonclicked)
  }

  return (
      <div className="min-h-screen flex gap-5 flex-col justify-center items-center ">
        <p className={`text-2xl ${glory.className}`}>Create your Workflow here 🐱‍🏍.</p>
        {/* <button className="bg-black text-white rounded-md px-5 py-2 text-sm shadow-md shadow-neutral-400" onClick={handlebuttonclicked}>create your first workflow.</button> */}
      </div>
  );
}
