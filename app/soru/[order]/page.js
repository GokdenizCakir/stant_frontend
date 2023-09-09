"use client";

import { useEffect, useState } from "react";
import { answerQuestion, getQuestion } from "../../_utils/requests";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [disabled, setDisabled] = useState(false);
  const rewards = [
    "500",
    "1.000",
    "2.000",
    "3.000",
    "5.000",
    "7.500",
    "15.000",
    "30.000",
    "60.000",
    "125.000",
    "250.000",
    "Gofret",
  ];
  useEffect(() => {
    getQuestion().then((data) => {
      setQuestion(data.data);
      if (data?.timeLeft) {
        setTimeLeft(data.timeLeft);
      }
      setDisabled(false);
    });
  }, []);

  useEffect(() => {
    if (question) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(intervalId);
            setDisabled(true);
            return 0;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [question]);

  const handleAnswer = async (e) => {
    answerQuestion({ answer: e }).then((data) => {
      console.log(data);
      router.push("/soru/ilerle");
    });
  };

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <div className="self-end space-y-2 select-none">
        <h1 className="px-8 py-1 bg-blue-950 text-slate-300 text-xl text-center border border-slate-50">
          {rewards[params.order - 1]} TL
        </h1>
        <h1 className="px-1 py-1 bg-blue-950 text-slate-300 text-xl border border-slate-50">
          <div className="flex gap-2 h-10 align-middle">
            <div className="flex justify-center items-center flex-1 h-full px-1 bg-sky-900 font-extrabold border border-slate-50 rounded-full cursor-pointer">
              50:50
            </div>
            <div className="flex justify-center items-center flex-1 h-full px-1 bg-sky-900 font-extrabold border border-slate-50 rounded-full cursor-pointer">
              x2
            </div>
          </div>
        </h1>
      </div>
      <div className="flex flex-col w-5/6 md:w-3/4 select-none">
        <div className="relative w-full h-2 mb-3 md:mb-2 bg-blue-950 border border-slate-50 overflow-hidden rounded-full">
          <div
            className="absolute transition-all ease-linear duration-1000 h-full bg-red-900"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
        <div
          className="relative w-full py-1 px-2 mx-auto bg-blue-950 text-md text-center text-slate-300 border-t border-b md:border border-slate-50"
          id="question"
        >
          <div className="left-triangle bg-blue-950 md:hidden" />
          <div className="left-triangle-border md:hidden" />
          <div className="right-triangle bg-blue-950 md:hidden" />
          <div className="right-triangle-border md:hidden" />
          {question?.value}
        </div>

        <ul
          className="flex flex-col md:flex-row gap-3 md:gap-1.5 w-full mx-auto mt-4 md:mt-3 text-slate-300"
          id="answers"
        >
          <li
            onClick={() => handleAnswer("a")}
            className="relative md:flex-1 group bg-blue-950 active:bg-[#0F1C3F] py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer"
          >
            <div className="left-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="left-triangle-border md:hidden" />
            <div className="right-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="right-triangle-border md:hidden" />
            <span className="text-yellow-400 font-semibold">A. </span>
            {question?.a}
          </li>
          <li
            onClick={() => handleAnswer("b")}
            className="relative md:flex-1 group bg-blue-950 active:bg-[#0F1C3F] py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer"
          >
            <div className="left-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="left-triangle-border md:hidden" />
            <div className="right-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="right-triangle-border md:hidden" />
            <span className="text-yellow-400 font-semibold">B. </span>
            {question?.b}
          </li>
          <li
            onClick={() => handleAnswer("c")}
            className="relative md:flex-1 group bg-blue-950 active:bg-[#0F1C3F] py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer"
          >
            <div className="left-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="left-triangle-border md:hidden" />
            <div className="right-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="right-triangle-border md:hidden" />
            <span className="text-yellow-400 font-semibold">C. </span>
            {question?.c}
          </li>
          <li
            onClick={() => handleAnswer("d")}
            className="relative md:flex-1 group bg-blue-950 active:bg-[#0F1C3F] py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer"
          >
            <div className="left-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="left-triangle-border md:hidden" />
            <div className="right-triangle group-active:bg-[#0F1C3F] bg-blue-950 md:hidden" />
            <div className="right-triangle-border md:hidden" />
            <span className="text-yellow-400 font-semibold">D. </span>
            {question?.d}
          </li>
        </ul>
      </div>
    </div>
  );
}
