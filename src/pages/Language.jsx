import React, { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { getPlatform } from "../utils/helperFunction";
import axios from "../api/instance.js";

function Language() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [platform, setPlatform] = useState("");

  const getUniqueID = async () => {
    const responce = await axios(`/guest_user?name=&phone=`);
    sessionStorage.setItem("unique_id", responce.data.unique_id);
    navigate(
      `/quiz/play?lang=${selectedLanguage?.toLowerCase()}&platform=${platform}`
    );
  };

  useEffect(() => {
    const platformName = getPlatform();
    setPlatform(platformName);
    setanimationForUIOpacity(true);
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className={` container bg-[url('/images/SignedJerseys1@2x.png')] min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <header className="pt-6 px-6 ">
        <img
          className="w-[83.21px] h-[73px]"
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
          onClick={() => navigate("/")}
        />
      </header>
      <div className="px-[18px]">
        <section>
          <div className="mt-[34px] flex justify-center items-center flex-col gap-2">
            <small className="font-RiftSoft text-3xl  text-white w-auto">
              CHOOSE LANGUAGE
            </small>
            <div className="text-white text-center  mx-auto  font-Barlow font-thin">
              <p>Be comfortable and give your best</p>
            </div>
          </div>
        </section>

        <section className=" w-full ">
          <div
            onClick={() => setSelectedLanguage("english")}
            className={`${
              animationForUIOpacity
                ? " transition-all duration-500 delay-700 ease-in"
                : "flip-90"
            } flex  justify-center items-center flex-col  gap-2 mt-7`}
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
          <div className="flex justify-around items-center mt-2">
            <div
              onClick={() => setSelectedLanguage("hindi")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-2`}
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
                  ? " transition-all duration-500 delay-700 ease-in"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-2`}
            >
              <div
                className={`${
                  selectedLanguage == "tamil" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className="gradient-text text-3xl font-medium text-red z-50">
                  அ
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Tamil
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center mt-8">
            <div
              onClick={() => setSelectedLanguage("telugu")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-2`}
            >
              <div
                className={`${
                  selectedLanguage == "telugu" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className="gradient-text text-3xl font-medium text-red z-50">
                  తె
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Telugu
              </p>
            </div>
            <div
              onClick={() => setSelectedLanguage("bangla")}
              className={`${
                animationForUIOpacity
                  ? " transition-all duration-500 delay-700 ease-in"
                  : "flip-90"
              } flex justify-center items-center flex-col  gap-2`}
            >
              <div
                className={`${
                  selectedLanguage == "bangla" ? "hexagon_selected " : "hexagon"
                } hexagon flex justify-center items-center`}
              >
                <h1 className="gradient-text text-3xl font-medium text-red z-50">
                  ঝ
                </h1>
              </div>
              <p className="text-white text-center  mx-auto text-lg  font-Barlow font-normal">
                Bangla
              </p>
            </div>
          </div>
        </section>
        <section className="mb-32 mt-[25px] w-full flex justify-center">
          <GradientButton
            onClick={getUniqueID}
            title="NEXT"
            className={` ${
              animationForUIOpacity
                ? "  transition-all duration-500 delay-700 ease"
                : " opacity-0  translate-y-20 "
            }`}
          />
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

export default Language;
