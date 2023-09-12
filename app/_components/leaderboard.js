"use client";

import React, { useState, useRef, useEffect } from "react";
import { getLeaderboard } from "../_utils/requests";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const isFirstRender = useRef(true);
  const leaderboard = useRef();
  const leaderboardButton = useRef();
  let timeoutId;

  useEffect(() => {
    getLeaderboard().then((data) => {
      setLeaderboardData(data);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isLeaderboardOpen) {
      leaderboard.current.classList.add("border-l-2");
    } else {
      timeoutId = setTimeout(() => {
        leaderboard.current.classList.remove("border-l-2");
      }, 1000);
    }
  }, [isLeaderboardOpen]);

  return (
    <>
      <div
        ref={leaderboardButton}
        className={`${
          isLeaderboardOpen ? "right-3/4 md:right-1/4" : "right-0"
        } flex fixed top-1/3 right-0 h-16 w-10 bg-zinc-100 rounded-l-md border-2 border-black border-r-0 p-1 transition-[right] duration-1000 delay-0 z-20 select-none cursor-pointer`}
        onClick={(event) => {
          setIsLeaderboardOpen(!isLeaderboardOpen);
          timeoutId && clearTimeout(timeoutId);
        }}
      >
        {isLeaderboardOpen && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
          </svg>
        )}
        {!isLeaderboardOpen && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path>
          </svg>
        )}
      </div>

      <div
        ref={leaderboard}
        className={`${
          isLeaderboardOpen ? "w-3/4 md:w-1/4" : "w-0 border-l-2"
        } flex flex-col items-center gap-6 fixed top-0 right-0 h-full py-20 bg-[#072B44]/95 z-10 transition-[width] duration-1000 delay-0 overflow-hidden border-white/60`}
      >
        <h1
          className={`text-3xl text-center text-neutral-300 font-bold ${
            isLeaderboardOpen ? "break-words" : "whitespace-nowrap"
          } select-none`}
        >
          Lider Tablosu
        </h1>
        <ul
          className={`w-full px-4 text-xl text-neutral-300 font-semibold ${
            isLeaderboardOpen ? "break-words" : "whitespace-nowrap"
          } select-none`}
        >
          {leaderboardData?.length === 0 && <li>Yükleniyor...</li>}
          {leaderboardData?.length !== 0 &&
            leaderboardData?.map((data, index) => {
              return (
                <li key={index}>
                  <span className="text-gray-400">{index + 1}.</span>{" "}
                  {data?.name} <span className="text-gray-400">-</span>{" "}
                  <span className="text-yellow-400">{data?.score}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
