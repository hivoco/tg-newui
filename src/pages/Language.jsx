import React, { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { getPlatform } from "../utils/helperFunction";
import axios from "../api/instance.js";
import Popup from "../components/Popup.jsx";
import DynamicLoading from "../components/DynamicLoading.jsx";

function Language() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);

  const messages = [
    "Please wait...",
    "Fetching question for you from database...",
    "Preparing quiz for you...",
    "We are about to finish this process...",
    "Ready to display....",
    "Please wait...",
  ];
  const getUniqueID = async () => {
    setLoading(true);
    const responce = await axios(`/guest_user?name=&phone=`);
    sessionStorage.setItem("unique_id", responce.data.unique_id);
    navigate(
      `/quiz/play?lang=${selectedLanguage?.toLowerCase()}&platform=${platform}`
    );
    setLoading(false);
  };

  useEffect(() => {
    const platformName = getPlatform();
    setPlatform(platformName);
    setanimationForUIOpacity(true);
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className={` border border-blue-800 container bg-[url('/images/SignedJerseys1@2x.png')]  min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-8 px-6 ">
        <img
          className="w-[5.375rem] h-[5rem]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
          onClick={() => navigate("/")}
        />
      </header>
      <div className="px-[18px] mt-[18px]">
        <div className="flex justify-center items-center flex-col gap-[2px]">
          <small className="font-RiftSoft text-3xl  text-white w-auto">
            CHOOSE LANGUAGE
          </small>
          <div className="text-white text-center  mx-auto  font-Barlow font-thin">
            <p>Be comfortable and give your best</p>
          </div>
        </div>

        <section className=" w-full ">
          <div
            onClick={() => setSelectedLanguage("english")}
            className={`${
              animationForUIOpacity
                ? " transition-all duration-500 delay-700 ease-in"
                : "flip-90"
            } flex  justify-center items-center flex-col  gap-[6px] mt-4`}
          >
            <div
              className={`${
                selectedLanguage == "english" ? "hexagon_selected " : "hexagon"
              } 
                
                hexagon flex justify-center items-center`}
            >
              <h1 className="gradient-text text-3xl font-medium text-red z-50">
                A
              </h1>
            </div>
            <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
              English
            </p>
          </div>

          <div className="flex justify-around items-center mt-3">
            <div
              onClick={() => setSelectedLanguage("hindi")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-[6px]`}
            >
              <div
                className={`${
                  selectedLanguage == "hindi" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className="gradient-text text-3xl font-medium text-red z-50">
                  अ
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Hindi
              </p>
            </div>
            <div
              onClick={() => setSelectedLanguage("tamil")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in "
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-[6px]`}
            >
              <div
                className={`${
                  selectedLanguage == "tamil" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center `}
              >
                <h1 className=" gradient-text text-3xl font-medium text-red z-50">
                  அ
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Tamil
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center mt-3">
            <div
              onClick={() => setSelectedLanguage("telugu")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in "
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-[6px]`}
            >
              <div
                className={`${
                  selectedLanguage === "telugu" ? "hexagon_selected" : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className=" gradient-text text-3xl font-medium text-red z-50">
                  తె
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Telugu
              </p>
            </div>
            <div
              // onClick={() => setSelectedLanguage("bangla")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in opacity-70"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-[6px]`}
            >
              <div
                className={`${
                  selectedLanguage == "bangla" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className=" text-lg font-medium text-blue-700 z-50 text-center">
                  {/* ঝ */}
                  Coming Soon
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Bangla
              </p>
            </div>
          </div>
        </section>

        <section className="mb-[7.25rem]  mt-8 w-full flex justify-center">
          {/* <GradientButton
              title="Let's Start"
              className={`${
                animationForUIOpacity
                  ? "opacity-100 bottom-10 scale-100 transition-all duration-500 delay-700 ease"
                  : "bottom-0 opacity-0 scale-50"
              } absolute   h-[75px] rounded-full px-[10px] py-[7px] z-20 `}
              onClick={yourFunction}
            /> */}

          <GradientButton
            onClick={getUniqueID}
            title="NEXT"
            className={` rounded-[2.375rem] px-[4.125rem] py-1 z-20  tracking-[0.72px] text-2xl leading-[2.875rem]   ${
              selectedLanguage
                ? "  transition-all duration-500 delay-700 ease"
                : " opacity-0  translate-y-20 "
            }`}
          />
        </section>

        <img
          className="absolute bottom-[14px] left-[15px] w-[3rem]"
          src="/images/veg_disclainer.svg"
          alt="game-logo.png"
        />
        <div className="flex justify-center">
          <img
            className="absolute bottom-[1.75rem] w-[9rem]"
            src="/images/HiVoco Studio@2x.png"
            alt="game-logo.png"
          />
        </div>
      </div>
      {loading && (
        <Popup bg="transparent">
          <DynamicLoading messages={messages} />
        </Popup>
      )}
    </div>
  );
}

export default Language;
