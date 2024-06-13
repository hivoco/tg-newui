import React, { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";

function AnimatedThirdPage() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);

  useEffect(() => {
    setanimationForUIOpacity(true);
  }, []);
  return (
    <div
      className={`  
         ${
           animationForUIOpacity
             ? "opacity-100 transition-all duration-500 delay-200 ease-in"
             : "opacity-0"
         } container bg-[url('/images/SignedJerseys1@2x.png')] min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />
      </header>
      <div className="px-[18px]">
        <section>
          <div class="mt-[34px] flex justify-center items-center flex-col gap-2">
            <small className="font-RiftSoft text-3xl  text-white w-auto">
              ALSO WIN
            </small>
            <img
              className="w-[393px]"
              src="/images/ribbon_gift_coupon@2x (1).png"
              alt="game-logo.png"
            />
          </div>
          <div class=" flex flex-col  items-center text-white ">
            <img
              className=" m-auto w-[347px] mt-[98px] "
              src="/images/amazon_coupon@2x (1).png"
              alt="game-logo.png"
            />
          </div>
          <div className="text-white text-center w-[277px] mx-auto mt-11 font-Barlow font-thin mb-32">
            <p>
              By clicking ”Accept” you agree to the T&C of Tata Gluco* Play &
              Win Gaming Contest.
            </p>
            <span className="underline mt-6">Click here to view T&C</span>
            <GradientButton title="ACCEPT" className={`mt-[23px] mx-auto`} />
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

export default AnimatedThirdPage;
