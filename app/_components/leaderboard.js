"use client";

import React, { useState, useRef, useEffect } from "react";
import { getLeaderboard } from "../_utils/requests";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Leaderboard() {
  const [page, setPage] = useState(1);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const isFirstRender = useRef(true);
  const leaderboard = useRef();
  const leaderboardButton = useRef();
  let timeoutId;

  const getMoreLeaderboard = async () => {
    const data = await getLeaderboard(page);
    if (!data || data.length === 0) {
      setHasMore(false);
    } else {
      setLeaderboardData([...leaderboardData, ...data]);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getLeaderboard(1).then((data) => {
      setLeaderboardData(data);
      setPage(2);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isLeaderboardOpen) {
      leaderboard.current.classList.add("border-l-2");
      leaderboard.current.classList.add("md:border-l-2");
      timeoutId = setTimeout(() => {
        leaderboard.current.classList.remove("border-l-2");
      }, 1000);
    } else {
      leaderboard.current.classList.add("border-l-2");
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
          isLeaderboardOpen
            ? "right-full md:right-1/4 -scale-x-100 md:scale-x-100 translate-x-full md:translate-x-0"
            : "right-0"
        } flex fixed top-16 right-0 h-16 w-10 bg-zinc-100 rounded-l-md border-2 border-black border-r-0 p-1 transition-all duration-1000 delay-0 z-30 select-none cursor-pointer`}
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
        id="scrollableDiv"
        className={`${
          isLeaderboardOpen ? "w-full md:w-1/4" : "w-0"
        } flex flex-col items-center gap-6 fixed top-0 right-0 h-full py-20 bg-[#072B44] md:bg-[#072B44]/95 z-20 transition-[width] duration-1000 delay-0 overflow-x-hidden overflow-y-scroll border-white/60`}
      >
        <div className="flex gap-4 items-center">
          <h1
            className={`text-3xl text-center text-neutral-300 font-bold whitespace-nowrap select-none`}
          >
            Lider Tablosu
          </h1>
          <div className="fill-neutral-300 w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M80-80v-60h81q-59-72-90-159T40-480q0-94 31-181t90-159H80v-60h200v200h-60v-116q-58 66-89 147t-31 169q0 88 31 169t89 147v-116h60v200H80Zm578-47q-23 8-46.5 7.5T566-131L304-253l18-40q10-20 28-32.5t40-14.5l68-5-112-307q-6-16 1-30.5t23-20.5q16-6 30.5 1t20.5 23l148 407-100 7 131 61q7 3 15 3.5t15-1.5l157-57q31-11 45-41.5t3-61.5l-55-150q-6-16 1-30.5t23-20.5q16-6 30.5 1t20.5 23l55 150q23 63-4.5 122.5T815-184l-157 57Zm-90-265-54-151q-6-16 1-30.5t23-20.5q16-6 30.5 1t20.5 23l55 150-76 28Zm113-41-41-113q-6-16 1-30.5t23-20.5q16-6 30.5 1t20.5 23l41 112-75 28Zm8 88Z" />
            </svg>
          </div>
        </div>
        <ul
          className={`w-full px-11 md:px-4 text-xl text-neutral-300 font-semibold ${
            isLeaderboardOpen ? "break-words" : "whitespace-nowrap"
          } select-none`}
          style={{ minHeight: "101%" }}
        >
          <InfiniteScroll
            dataLength={leaderboardData?.length}
            next={getMoreLeaderboard}
            hasMore={hasMore}
            loader={<li className="text-gray-400 mb-20">Yükleniyor...</li>}
            endMessage={
              <li className="text-gray-400 mb-20">
                Gösterilecek daha fazla kullanıcı kalmadı.
              </li>
            }
            scrollableTarget="scrollableDiv"
            style={{ overflowX: "hidden" }}
          >
            {leaderboardData?.map((data, index) => {
              return (
                <li key={index}>
                  <span className="text-gray-400">{index + 1}.</span>{" "}
                  {data?.name} <span className="text-gray-400">-</span>{" "}
                  <span className="text-yellow-400">{data?.score}</span>
                </li>
              );
            })}
          </InfiniteScroll>
        </ul>
      </div>
    </>
  );
}
