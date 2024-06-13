import React from "react";

function Loading() {
  return (
    <div className="container bg-[url('/images/loader_screen_bg@2x.png')]  h-screen   w-screen   bg-center bg-cover    bg-no-repeat relative">
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />
      </header>
      <section>
        <div class="mt-[150px]">
          <img
            className="w-[303px]   m-auto"
            src="/images/superstar.png"
            alt="game-logo.png"
          />
        </div>
        <div class="mt-[10px] flex flex-col gap-10 items-center text-white">
          <img
            className=" m-auto animate-spin"
            src="/images/pre_loader.png"
            alt="game-logo.png"
          />

          <div className="flex items-center font-RiftSoft text-3xl font-extralight tracking-wide">
            <span>LOADING</span>
            <span className="dot1 mx-1">.</span>
            <span className="dot2 mx-1">.</span>
            <span className="dot3 mx-1">.</span>
          </div>
        </div>
      </section>
      <section className="w-full text-white mt-[130px]">
        <p className="mx-auto text-lg font-Barlow font-Regular w-[277px] text-center">
          Answer questions correctly in the shortest timespan to improve your
          chances of winning.
        </p>
      </section>

      {/* <img
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
      </div> */}
    </div>
  );
}

export default Loading;
