import { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";

function AnimatedThirdPage() {
  const navigate = useNavigate();
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);

  useEffect(() => {
     let timer = setTimeout(() => {
       setanimationForUIOpacity(true);
     }, 700);
     return () => {
       clearTimeout(timer);
     };
  }, []);

  const handleClick = () => {
    navigate("/select-language");
  };
  return (
    <div
      className={`   border border-blue-800
        container bg-[url('/images/SignedJerseys1@2x.png')] min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-8 px-6 ">
        <img
          className="w-[5.375rem] h-20"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />
      </header>
      <div className="px-6">
        <section>
          <div
            className={` ${
              animationForUIOpacity
                ? "  transition-all duration-500 delay-700 ease"
                : " opacity-0  -translate-y-20 "
            }  mt-[34px] flex justify-center items-center flex-col gap-2`}
          >
            <small className="font-RiftSoft text-3xl  text-white w-auto font-semibold  -tracking-[0.6px]">
              ALSO WIN
            </small>
            <img
              className="h-20"
              src="/images/ribbon_gift_coupon@2x (1).png"
              alt="game-logo.png"
            />
          </div>
          <div
            className={`${
              animationForUIOpacity
                ? " opacity-100 transition-all duration-500 delay-700 ease"
                : " opacity-0  scale-0 "
            } flex flex-col  items-center text-white`}
          >
            <img
              className="w-[18.4rem] h-[9.750rem] object-contain mt-7 px-10"
              src="/images/amazon_coupon@2x (1).png"
              alt="game-logo.png"
            />
          </div>

          <div
            className={`${
              animationForUIOpacity
                ? " opacity-100 transition-all duration-500 delay-700 ease"
                : " opacity-0   "
            } text-white text-center  text-lg leading-[22px] -tracking-[1.17px]  mx-auto mt-[1.9rem] font-Barlow font-normal mb-32`}
          >
            <div className="flex flex-col gap-6">
              <p className="px-6">
                By clicking ”Accept” you agree to the T&C of Tata Gluco* Play &
                Win Gaming Contest.
              </p>

              <p className="underline ">Click here to view T&C</p>
            </div>

            <GradientButton
              title="ACCEPT"
              className={` ${
                animationForUIOpacity
                  ? "  transition-all duration-500 delay-700 ease"
                  : " opacity-0  translate-y-20 "
              } mt-[2.6875rem] rounded-[2.375rem] px-[3.5rem] py-[4px] z-20  leading-[2.875rem] tracking-[0.72px] font-normal text-center`}
              onClick={handleClick}
            />
          </div>
        </section>

        <img
          className="absolute bottom-3  left-3 w-[2.8125rem]"
          src="/images/veg_disclainer@2x.png"
          alt="game-logo.png"
        />
        <div className="flex justify-center">
          <img
            className="absolute bottom-[2.375rem] w-[9rem]"
            src="/images/HiVoco Studio@2x.png"
            alt="game-logo.png"
          />
        </div>
      </div>
    </div>
  );
}

export default AnimatedThirdPage;
