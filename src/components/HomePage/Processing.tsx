import { FC, useEffect, useState } from "react";

const Processing: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [text, setText] = useState<string>("Generating the analysis report...");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setText("Almost there...");
    }, 20000);

    if (isLoading) {
    } else {
      clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <div className="fixed top-0 w-screen h-screen z-50 flex justify-center items-center bg-black/35">
      <div className="relative w-[800px] h-32 rounded-full bg-slate-200 overflow-hidden">
        <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-slate-700 font-medium flex flex-col items-center gap-2 w-max">
          <span>Estimated time: 45 seconds.</span>
          <span className=" text-xl animate-pulse">{text}</span>
        </p>
        <div id="wave">
          <svg width="100%" height="150px" fill="none">
            <path fill="white">
              <animate
                repeatCount="indefinite"
                fill="freeze"
                attributeName="d"
                dur="10s"
                values="
    M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;
    M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z;
    M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;
    M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z"
              ></animate>
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Processing;
