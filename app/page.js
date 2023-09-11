"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Leaderboard from "./_components/leaderboard";

const page = () => {
  const router = useRouter();
  const moneyRef = React.useRef();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!data.full_name || !data.phone) {
      setError("Lütfen tüm alanları doldurunuz");
      return;
    }

    try {
      setDisabled(true);
      const response = await axios.post(
        "https://backend.egehan.dev/api/v1/players",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setError(null);
      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      setError(err?.response?.data?.error);
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-24 items-center h-full">
      <Leaderboard />
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
        {error && (
          <p
            id="error"
            className="text-red-500 text-center font-bold capitalize select-none"
          >
            {error}
          </p>
        )}
        <input
          className="block w-full bg-zinc-800/95 disabled:bg-zinc-800/70 text-stone-400 px-4 py-1.5 border-2 border-zinc-700 rounded-sm"
          type="text"
          placeholder="Ad Soyad"
          name="full_name"
          disabled={disabled}
        />
        <input
          className="block w-full bg-zinc-800/95 disabled:bg-zinc-800/70 text-stone-400 px-4 py-1.5 border-2 border-zinc-700 rounded-sm"
          type="text"
          placeholder="Telefon Numarası"
          name="phone"
          disabled={disabled}
        />
        <button
          className="block w-full active:bg-zinc-100/60 py-2 bg-zinc-100 disabled:bg-zinc-100/60 text-black font-bold rounded-sm"
          type="submit"
          disabled={disabled}
        >
          {!disabled && "Oyna"}
          {disabled && (
            <span className="play-loader w-4 h-4 align-middle"></span>
          )}
        </button>
      </form>
    </div>
  );
};

export default page;
