"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-8 w-full h-20 px-8 flex justify-center">
      <div className="container h-full bg-[#2E3438] rounded-full flex justify-between items-center px-6 shadow-xl">
        <Link
          href={"/"}
          className="rounded-full py-3 px-8 shadow-[0_3px_10px_rgb(0,0,0,0.5)]"
        >
          🏠
        </Link>
        <h1 className="text-2xl font-sans font-semibold">
          🚀 Patent Infringement Checker
        </h1>
        <button
          className="rounded-full py-3 px-8 shadow-[0_3px_10px_rgb(0,0,0,0.5)] flex flex-col gap-2"
          onClick={() => alert("Hello there! 👋🏻")}
        >
          <div className="w-6 h-[2px] bg-gray-200/80"></div>
          <div className="w-6 h-[2px] bg-gray-200/80"></div>
          <div className="w-6 h-[2px] bg-gray-200/80"></div>
        </button>
      </div>
    </header>
  );
};
export default Navbar;
