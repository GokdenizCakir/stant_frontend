"use client";

import React from "react";
import { Rain } from "react-rainfall";
import { useWindowSize } from "../_utils/hooks";

export default function YouLosePage() {
  const windowSize = useWindowSize();
  return (
    <div
      style={{
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
      }}
      className="flex flex-col justify-center items-center relative gap-8 h-full"
    >
      <Rain />
      <h1 class="meme-text text-4xl text-white select-none">
        Kaybettin gofretçi 😥
      </h1>
      <img src="/images/loser.gif" />
    </div>
  );
}
