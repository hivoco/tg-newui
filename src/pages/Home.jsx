import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsMusicAllowed }) => {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
    const navigate = useNavigate();
  const containerWidth = 349;
  const circleDiameter = 80; // 50px diameter (half of the 100px width)
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [movedRight, setMovedRight] = useState(false);

  useEffect(() => {
    setanimationForUIOpacity(true);
    setIsMusicAllowed(false);
  }, []);

  const handleStart = (clientX) => {
    setDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX) => {
    if (dragging) {
      setCurrentX(clientX);
    }
  };

  const handleEnd = (clientX) => {
    setDragging(false);
    const moveDistance = clientX - startX;

    if (moveDistance > containerWidth / 2) {
      setMovedRight(true);
      yourFunction();
    } else {
      setMovedRight(false);
    }
  };

  const yourFunction = () => {
    setIsMusicAllowed(true)
    navigate("/select-language")

  };

  const translateX = movedRight
    ? containerWidth - circleDiameter
    : dragging
    ? currentX - startX
    : 0;

  return (
    <div
      className={`${
        animationForUIOpacity
          ? "opacity-100 transition-all duration-500 delay-200 ease-in"
          : "opacity-0"
      } container bg-[url('/images/splash-bg@2x.png')]  min-h-screen   w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
          
        />
      </header>
      <section className="mt-[18px] w-full  ">
        <img
          className="w-[387px] h-[168px]  m-auto"
          src="/images/superstar.png"
          alt="game-logo.png"
        />
        <img
          className="m-auto w-[292px]"
          src="/images/tag@2x.png"
          alt="game-logo.png"
        />
        <img
          className="m-auto mt-[18px] w-[144px]"
          src="/images/HiVoco Studio@2x.png"
          alt="game-logo.png"
        />
      </section>

      <section className="flex justify-center w-full  ">
        <div
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={(e) => handleEnd(e.clientX)}
          onMouseLeave={(e) => handleEnd(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
          className="absolute flex items-center border-[3px] border-white bottom-10 bg-gradient-to-r from-[#0071C7] from-10% via-[#960000] via-60%  to-[#960000] to-90% w-[349px] h-[75px] rounded-full px-[10px] py-[7px] gap-[37px] overflow-hidden"
        >
          <div
            className={`${dragging ? "" : "transition-transform duration-500"}`}
            style={{ transform: `translateX(${translateX}px)` }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)} // Ensure drag ends if the mouse leaves the container
          >
            <img src="/images/footbal.png" alt="footbal" />
          </div>

          <small className="font-RiftSoft text-2xl text-white">
            SWIP TO START
          </small>
        </div>
      </section>
    </div>
  );
};

export default Home;
