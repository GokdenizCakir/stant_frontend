"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "../_utils/hooks";
import Leaderboard from "../_components/leaderboard";

export default function YouWinPage() {
  const windowSize = useWindowSize();
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setSize({ width: windowSize.width, height: windowSize.height });
  }, [windowSize]);
  return (
    <div className="flex flex-col justify-center items-center gap-8 h-full">
      <Leaderboard />
      <Confetti width={size.width} height={size.height} />
      <h1 className="meme-text text-4xl text-white select-none">
        Hadi iyisin gofretçi &#129299;
      </h1>
      <img src="/images/winner.gif" />
    </div>
  );
}
