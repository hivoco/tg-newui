import  { useEffect, useState } from "react";
import Animated from "./Animated";
import { preloadImages } from "../components/preloadImages";
import Popup from "../components/Popup";
import GradientButton from "../components/GradientButton";

const Home = ({ setIsMusicAllowed }) => {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  const containerWidth = 349;
  const circleDiameter = 80; // 50px diameter (half of the 100px width)
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [movedRight, setMovedRight] = useState(false);
  const [startSplashScreen, setstartSplashScreen] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setanimationForUIOpacity(true);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const images = [
    '/images/Login-bg.png',
    '/images/bg_quiz_screen.png',
    "/images/splash-bg@2x.png",
    "/images/players-home.png",
    "/images/loader_screen_bg@2x.png",
    "/images/player-loading.png",
    "/images/SignedJerseys1@2x.png",
    "/images/SignedJerseys1@2x.png",
    "/images/SignedJerseys1@2x.png",
    "/images/ribbon_gift_coupon@2x (1).png",
    "/images/ribbon_jerseys@2x (1).png",
    "/images/top_winners@2x (1).png",

    "/images/superstar.png",
    "/images/pre_loader.png",
    "/images/tgp-logo.png",
    "/images/HiVoco Studio@2x.png",
    "/images/amazon_coupon@2x (1).png",
  ];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preloadedImages = preloadImages(images);
    Promise.all(preloadedImages.map((img) => img.decode()))
      .then(() => setLoaded(true))
      .catch((error) => console.error("Image failed to load", error));
  }, []);

  if (!loaded) {
    return (
      <div className="w-screen h-screen bg-blue-800   ">
        <Popup bg={"transparent"}>
          <div className=" flex flex-col justify-center items-center gap-2 ">
            <img
              className="animate-spin"
              src="/images/footbal.png"
              alt="Loading"
              srcSet=""
            />
            <div className="flex items-center font-RiftSoft text-2xl text-center text-white mt-2 font-extralight tracking-wide ">
              <span className="uppercase ">Loading</span>
              <span className="dot1 ">.</span>
              <span className="dot2 ">.</span>
              <span className="dot3 ">.</span>
            </div>
          </div>
        </Popup>
      </div>
    );
  }

  const handleStart = (clientX) => {
    setDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    // setIsMusicAllowed(true);
  };

  const handleMove = (clientX) => {
    if (dragging) {
      setCurrentX(clientX);
      // setIsMusicAllowed(true);
    }
    // setIsMusicAllowed(true);
  };

  const handleEnd = (clientX) => {
    // setIsMusicAllowed(true);
    setDragging(false);
    const moveDistance = clientX - startX;

    if (moveDistance > containerWidth / 2) {
      setMovedRight(true);
      // setIsMusicAllowed(true);
      yourFunction();
    } else {
      setMovedRight(false);
      // setIsMusicAllowed(true);
    }
    // setIsMusicAllowed(true);
  };

  const yourFunction = () => {
    setIsMusicAllowed(true);
    setstartSplashScreen(true);
  };

  const translateX = movedRight
    ? containerWidth - circleDiameter
    : dragging
    ? currentX - startX
    : 0;

  return (
    <>
      {startSplashScreen ? (
        <Animated />
      ) : (
        <div
          className={`animate-fadeIn container bg-[url('/images/splash-bg@2x.png')]  min-h-screen   w-screen   bg-center bg-cover    bg-no-repeat relative`}
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
              className={`${
                animationForUIOpacity
                  ? "opacity-100 transition-all duration-500 delay-200 ease"
                  : " opacity-0 scale-0 -translate-y-32 "
              } w-[387px] h-[168px]   m-auto  `}
              src="/images/superstar.png"
              alt="game-logo.png"
            />
            <img
              className={`${
                animationForUIOpacity
                  ? "scale-100 transition-all duration-500 delay-200 ease"
                  : "scale-75 opacity-0"
              } m-auto w-[292px]`}
              src="/images/tag@2x.png"
              alt="game-logo.png"
            />
            <img
              className={`${
                animationForUIOpacity
                  ? "opacity-100 transition-all duration-500 delay-200 ease"
                  : "mt-24 opacity-0"
              } m-auto mt-[18px] w-[144px]`}
              src="/images/HiVoco Studio@2x.png"
              alt="game-logo.png"
            />
          </section>

          <section className={`  flex justify-center w-full`}>
            {/* <div
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={(e) => handleEnd(e.clientX)}
              onMouseLeave={(e) => handleEnd(e.clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
              className={`${
                animationForUIOpacity
                  ? "opacity-100 bottom-10 scale-100 transition-all duration-500 delay-700 ease"
                  : "bottom-0 opacity-0 scale-50"
              } absolute  flex items-center border-[3px] border-white  bg-gradient-to-r from-[#0071C7] from-10% via-[#960000] via-60%  to-[#960000] to-90% w-[349px] h-[75px] rounded-full px-[10px] py-[7px] gap-[37px] overflow-hidden`}
            >
              <div
                className={`${
                  dragging ? "" : "transition-transform duration-500"
                }`}
                style={{ transform: `translateX(${translateX}px)` }}
                onMouseDown={(e) => handleStart(e.clientX)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)} // Ensure drag ends if the mouse leaves the container
              >
                <img src="/images/footbal.png" alt="footbal" />
              </div>

              <small className="font-RiftSoft text-2xl text-white">
                SWIP TO START
              </small>
            </div> */}

            <GradientButton
              title="Let's Start"
              className={`${
                animationForUIOpacity
                  ? "opacity-100 bottom-10 scale-100 transition-all duration-500 delay-700 ease"
                  : "bottom-0 opacity-0 scale-50"
              } absolute   h-[75px] rounded-full px-[10px] py-[7px] z-20 `}
              onClick={yourFunction}
            />
            <img
              className={`${
                animationForUIOpacity
                  ? "opacity-100 bottom-0 scale-100 transition-all duration-500 delay-200 ease"
                  : "bottom-0 opacity-0 scale-50"
              } absolute  h-[350px] w-full z-10 `}
              src="/images/players-home.png"
              alt="game-logo.png"
            />
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
