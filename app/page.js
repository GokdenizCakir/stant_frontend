"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getLeaderboard } from "./_utils/requests";

const page = () => {
  const router = useRouter();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const isFirstRender = useRef(true);
  const leaderboard = useRef();
  const leaderboardButton = useRef();
  const moneyRef = React.useRef();
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
      leaderboard.current.classList.remove("w-0");
      leaderboard.current.classList.add("w-3/4");
      leaderboard.current.classList.add("md:w-1/4");
      leaderboard.current.classList.add("border-l-2");
      leaderboardButton.current.classList.remove("right-0");
      leaderboardButton.current.classList.add("right-3/4");
      leaderboardButton.current.classList.add("md:right-1/4");
    } else {
      leaderboard.current.classList.remove("w-3/4");
      leaderboard.current.classList.remove("md:w-1/4");
      leaderboard.current.classList.add("w-0");
      timeoutId = setTimeout(() => {
        leaderboard.current.classList.remove("border-l-2");
      }, 1000);
      leaderboardButton.current.classList.remove("right-3/4");
      leaderboardButton.current.classList.remove("md:right-1/4");
      leaderboardButton.current.classList.add("right-0");
    }
  }, [isLeaderboardOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/players",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-24 items-center h-full">
      <div
        ref={leaderboardButton}
        className="flex fixed top-1/3 right-0 h-16 w-10 bg-zinc-100 rounded-l-md border-2 border-black border-r-0 p-1 transition-[right] duration-1000 delay-0 z-20 select-none cursor-pointer"
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
        className="flex flex-col items-center gap-6 fixed top-0 right-0 w-0 h-full py-20 bg-[#072B44]/95 z-10 transition-[width] duration-1000 delay-0 overflow-hidden whitespace-nowrap border-white/60"
      >
        <h1 className="text-3xl text-neutral-300 font-bold select-none">
          Lider Tablosu
        </h1>
        <ul className="text-xl text-neutral-300 font-semibold select-none">
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

      <img src="/images/logo.png" className="w-1/3 md:w-1/6" alt="logo" />
      <form
        className="login relative space-y-4 py-8 px-8 w-5/6 sm:w-1/2 md:w-1/3 bg-neutral-900 text-slate-200 rounded-sm outline-2 outline-white/60 -outline-offset-[0.75rem] outline-dashed"
        onMouseEnter={() => {
          moneyRef.current.classList.add("money-move-up");
        }}
        onSubmit={handleSubmit}
      >
        <div className="absolute left-2 bottom-2 bg-neutral-800 w-full h-full -z-20" />
        <div className="money" ref={moneyRef}></div>
        <input
          className="block w-full bg-zinc-800/95 text-stone-400 px-4 py-1.5 border-2 border-zinc-700 rounded-sm"
          type="text"
          placeholder="Ad Soyad"
          name="full_name"
        />
        <input
          className="block w-full bg-zinc-800/95 text-stone-400 px-4 py-1.5 border-2 border-zinc-700 rounded-sm"
          type="text"
          placeholder="Telefon Numarası"
          name="phone"
        />
        <button
          className="block w-full active:bg-zinc-100/60 py-2 bg-zinc-100 text-black font-bold rounded-sm"
          type="submit"
        >
          Oyna
        </button>
      </form>
    </div>
  );
};

export default page;
