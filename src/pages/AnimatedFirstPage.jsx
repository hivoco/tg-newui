import React, { useEffect, useState } from "react";
import AnimatedSecondPage from "./AnimatedSecondPage";

function AnimatedFirstPage() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setanimationForUIOpacity(true);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div
      className={`border border-blue-800 animate-fadeIn container bg-[url('/images/loader_screen_bg@2x.png')]  min-h-screen   w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />
      </header>
      <img
        className={`${
          animationForUIOpacity
            ? "opacity-100 top-28 scale-100 transition-all duration-500 delay-700 ease"
            : "bottom-0 opacity-0 scale-50"
        } absolute  object-contain w-full z-10`}
        src="/images/player-loading.png "
        alt="game-logo.png"
      />
      <div className="mx-[18px] ">
        <section
          className={`relative z-20 ${
            animationForUIOpacity
              ? "transition-all duration-500 delay-700 ease"
              : " opacity-0 -translate-y-32  "
          }`}
        >
          <div className="mt-[150px] ">
            <img
              className="w-[303px]   m-auto"
              src="/images/superstar.png"
              alt="game-logo.png"
            />
          </div>
          <div className="mt-[50px] flex flex-col gap-10 items-center text-white">
            <img
              className=" h-[120px] w-[120px] m-auto animate-spin"
              src="/images/pre_loader.png"
              alt="game-logo.png"
            />

            <div className="flex items-center font-RiftSoft text-3xl font-thin tracking-wide">
              <span>LOADING</span>
              <span className="dot1 mx-1">.</span>
              <span className="dot2 mx-1">.</span>
              <span className="dot3 mx-1">.</span>
            </div>
          </div>
        </section>

        <img
          className="absolute bottom-[14px] left-[15px] w-[45px]"
          src="/images/veg_disclainer@2x.png"
          alt="game-logo.png"
        />
        <div className="flex justify-center">
          <img
            className="absolute bottom-[28px] w-[144px]"
            src="/images/HiVoco Studio@2x.png"
            alt="game-logo.png"
          />
        </div>
      </div>
    </div>
  );
}

export default AnimatedFirstPage;
