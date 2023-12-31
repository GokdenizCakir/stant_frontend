"use client";

import Confetti from "react-confetti";
import { Rain } from "react-rainfall";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/app/_utils/hooks";
import { answerQuestion, getQuestion } from "../../_utils/requests";

export default function Home({ params }) {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [disabled, setDisabled] = useState(false);

  let intervalId;

  const windowSize = useWindowSize();
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setSize({ width: windowSize.width, height: windowSize.height });
  }, [windowSize]);

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
    "1.000.000",
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
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (playerAnswer) {
            clearInterval(intervalId);
            return prevTimeLeft;
          }

          if (prevTimeLeft < 0) {
            clearInterval(intervalId);
            handleAnswer("z", false);
            return 0;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [question, playerAnswer]);

  const answerButtonColor = (iterAnswer) => {
    let className = "";
    if (!answer && !playerAnswer) {
      className += "bg-blue-950";
    } else if (!answer && playerAnswer === iterAnswer) {
      className += "bg-[#B45309]";
    } else if (!answer && playerAnswer !== iterAnswer) {
      className += "bg-blue-950";
    } else if (answer && playerAnswer !== iterAnswer && answer !== iterAnswer) {
      className += "bg-blue-950";
    } else if (answer && answer === iterAnswer) {
      className += "bg-[#3F6212]";
    } else if (
      answer &&
      playerAnswer === iterAnswer &&
      playerAnswer !== answer
    ) {
      className += "bg-red-600";
    }

    return className;
  };

  const handleAnswer = async (e, hasGaveUp) => {
    setPlayerAnswer(e);
    setDisabled(true);
    answerQuestion({ answer: e, hasGaveUp: hasGaveUp }).then((data) => {
      setAnswer(data?.answer);
      if (data?.answer === e) {
        window?.navigator?.vibrate?.(100);
        if (data?.winner) {
          setTimeout(() => {
            window.location.replace("/kazandin");
          }, 3000);
        } else {
          setTimeout(() => {
            router.push(`/soru/ilerle/${Number(params.order) + 1}`);
          }, 3000);
        }
      } else if (data?.answer !== e) {
        window?.navigator?.vibrate?.(400);
        setTimeout(() => {
          if (hasGaveUp) {
            window.location.replace("/pes-ettin");
          } else {
            window.location.replace("/kaybettin");
          }
        }, 3000);
      }
    });
  };

  return (
    <div className="flex flex-col justify-around items-center h-full">
      {!question && (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center gap-4 w-screen h-screen bg-black/90 z-20">
          <span className="question-loader"></span>
          <p className="text-white text-xl font-semibold select-none animate-pulse">
            Soru Yükleniyor...
          </p>
        </div>
      )}
      {answer && playerAnswer === answer && (
        <Confetti width={size.width} height={size.height} />
      )}
      {answer && playerAnswer !== answer && (
        <div className="absolute w-screen h-screen">
          <Rain />
        </div>
      )}
      <div className="self-end space-y-2 select-none">
        <h1 className="px-8 py-1 bg-blue-950 text-slate-300 text-xl text-center border border-r-0 border-slate-50">
          {rewards[params.order - 1]} TL
        </h1>
        <h1 class="px-4 py-1 bg-blue-950 text-slate-300 text-xl border border-r-0 border-slate-50">
          <div class="flex h-10 align-middle">
            <div
              class={`flex justify-center items-center flex-1 h-full px-1 ${
                !disabled ? "bg-sky-900" : "bg-sky-900/60"
              } active:bg-sky-900/60 font-bold border border-slate-50 rounded-full cursor-pointer`}
              onClick={() => {
                if (!disabled) handleAnswer("z", true);
              }}
            >
              Pes Et
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
          {["a", "b", "c", "d"].map((iterAnswer) => (
            <li
              onClick={() => {
                if (!disabled) handleAnswer(iterAnswer, false);
              }}
              className={`relative md:flex-1 group ${answerButtonColor(
                iterAnswer
              )} ${
                !answer && "active:bg-[#0F1C3F]"
              } py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer transition-colors duration-500`}
              key={iterAnswer}
            >
              <div
                className={`left-triangle ${answerButtonColor(iterAnswer)} ${
                  !answer && "group-active:bg-[#0F1C3F]"
                } md:hidden`}
              />
              <div className="left-triangle-border md:hidden" />
              <div
                className={`right-triangle ${answerButtonColor(iterAnswer)} ${
                  !answer && "group-active:bg-[#0F1C3F]"
                } md:hidden`}
              />
              <div className="right-triangle-border md:hidden" />
              <span className="text-yellow-400 font-semibold">
                {iterAnswer.toUpperCase()}.{" "}
              </span>
              {question?.[iterAnswer]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
