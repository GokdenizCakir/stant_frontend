import React from "react";
import Link from "next/link";

const page = ({ params }) => {
  const currentQuestionIndex = params.order - 2;
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

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <div className="flex flex-col w-5/6 md:w-3/4 select-none">
        <ul className="flex flex-col-reverse gap-2 w-full mx-auto text-slate-300">
          {rewards.map((reward, index) => {
            return (
              <li
                className={`relative md:flex-1 ${
                  currentQuestionIndex === index
                    ? "bg-yellow-900"
                    : "bg-blue-950"
                } py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50`}
                key={index}
              >
                <div
                  className={`left-triangle ${
                    currentQuestionIndex === index
                      ? "bg-yellow-900"
                      : "bg-blue-950"
                  } md:hidden`}
                />
                <div className="left-triangle-border md:hidden" />
                <div
                  className={`right-triangle ${
                    currentQuestionIndex === index
                      ? "bg-yellow-900"
                      : "bg-blue-950"
                  } md:hidden`}
                />
                <div className="right-triangle-border md:hidden" />
                <span className="text-yellow-400 font-semibold">
                  {index + 1}.{" "}
                </span>
                <span className="font-semibold">{reward} TL</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-5/6 md:w-3/4 select-none">
        <div className="w-full mx-auto">
          <Link href={`/soru/${currentQuestionIndex + 2}`}>
            <div className="relative md:flex-1 group active:bg-[#65843c] bg-[#3F6212] py-1 px-2 text-md text-center text-slate-300 border-t border-b md:border border-slate-50 cursor-pointer">
              <div className="left-triangle group-active:bg-[#65843c] bg-lime-800 md:hidden" />
              <div className="left-triangle-border md:hidden" />
              <div className="right-triangle group-active:bg-[#65843c] bg-lime-800 md:hidden" />
              <div className="right-triangle-border md:hidden" />
              <span className="font-semibold">Yeni Soruya Geç</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
