import React, { useEffect, useState } from "react";

function AnimatedSecondPage() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  useEffect(() => {
    setanimationForUIOpacity(true);
  }, []);
  return (
    <div className="container bg-[url('/images/SignedJerseys1@2x.png')] min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative">
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />
      </header>
      <div className="mx-[18px]">
        <section>
          <div
            className={`  ${
              animationForUIOpacity
                ? "  transition-all duration-500 delay-700 ease"
                : " opacity-0  -translate-y-20 "
            }  mt-[34px] flex justify-center items-center flex-col gap-2`}
          >
            <small className="font-RiftSoft text-3xl  text-white w-auto">
              CHANCE TO WIN
            </small>
            <img
              className="w-[303px]"
              src="/images/ribbon_jerseys@2x (1).png"
              alt="game-logo.png"
            />
          </div>
          <div className=" flex flex-col  items-center text-white ">
            <img
              className={`${
                animationForUIOpacity
                  ? " opacity-100 transition-all duration-500 delay-700 ease"
                  : " opacity-0  scale-0 "
              } m-auto`}
              src="/images/t_shirts@2x.png"
              alt="game-logo.png"
            />
            <img
              className={`${
                animationForUIOpacity
                  ? "  transition-all duration-500 delay-700 ease"
                  : " opacity-0  translate-y-20 "
              } m-auto w-[260px] -mt-10`}
              src="/images/top_winners@2x (1).png"
              alt="game-logo.png"
            />
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

export default AnimatedSecondPage;
