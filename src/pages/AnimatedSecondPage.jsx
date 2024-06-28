import { useEffect, useState } from "react";

function AnimatedSecondPage() {
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
    <div className="border border-blue-800 animate-fadeIn container bg-[url('/images/SignedJerseys1@2x.png')]  min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative">
      <div className="flex flex-col gap-[2.375rem]">
        <header className="pt-6 px-6 ">
          <img
            className="w-24  h-[5.25rem] "
            src="/images/tgp-logo.png"
            alt="tgp-logo.png"
          />
        </header>

        <div className="px-[1.19rem] mb-28">
          <section>
            <div
              className={`  ${
                animationForUIOpacity
                  ? "  transition-all duration-500 delay-700 ease"
                  : " opacity-0  -translate-y-20 "
              }   flex justify-center items-center flex-col gap-[8.3px]`}
            >
              <small className="font-RiftSoft text-3xl font-normal -tracking-[0.6px]  text-white w-auto">
                CHANCE TO WIN
              </small>
              <img
                className="h-20"
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
                } m-auto `}
                src="/images/t_shirts@2x.png"
                alt="game-logo.png"
              />
              <img
                className={`${
                  animationForUIOpacity
                    ? "  transition-all duration-500 delay-700 ease"
                    : " opacity-0  translate-y-20 "
                } m-auto w-[14.56rem]   -mt-10`}
                src="/images/top_winners@2x (1).png"
                alt="game-logo.png"
              />
            </div>
          </section>

          <img
            className="absolute bottom-3  left-[15px] w-[2.81rem]"
            src="/images/veg_disclainer@2x.png"
            alt="game-logo.png"
          />
          <div className="flex justify-center">
            <img
              className="mt-6 absolute bottom-[2.375rem] w-36 "
              src="/images/HiVoco Studio@2x.png"
              alt="game-logo.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimatedSecondPage;
