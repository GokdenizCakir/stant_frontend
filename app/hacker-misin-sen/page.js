"use client";

import React from "react";
import { Rain } from "react-rainfall";
import Leaderboard from "../_components/leaderboard";

export default function YouAreHackerPage() {
  return (
    <div className="flex flex-col justify-center items-center relative gap-8 h-full">
      <Leaderboard />
      <div className="absolute w-screen h-screen">
        <Rain />
      </div>
      <h1 className="meme-text text-4xl text-white text-center select-none">
        Bakıyorum kurnazlık peşindesin. 🤣
      </h1>
      <img src="/images/laugh.gif" />
    </div>
  );
}
