import React from "react";
import { glory } from "@/styles/fonts"

export default function Home() {
  return (
      <div className="min-h-screen flex justify-center items-center ">
        <p className={`text-3xl ${glory.className}`}>Hi, buddy</p>
      </div>
  );
}
