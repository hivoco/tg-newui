import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../components/GradientButton";

function InformationPage() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState("english");

  // const [platform, setPlatform] = useState("");

  // const getUniqueID = async () => {
  //   const responce = await axios(`/guest_user?name=&phone=`);
  //   sessionStorage.setItem("unique_id", responce.data.unique_id);
  //   navigate(
  //     `/quiz/play?lang=${selectedLanguage?.toLowerCase()}&platform=${platform}`
  //   );
  // };

  useEffect(() => {
    setanimationForUIOpacity(true);
  }, []);

  const navigate = useNavigate();
  return (
    <div
      className={`${
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

        <section className=" w-full mt-20 ">
          <input
            className="w-80 h-20 rounded-full p-5"
            placeholder="Write Your Name"
          />
        </section>
        <section className="mb-32 mt-[25px] w-full flex justify-center">
          <GradientButton onClick={""} title="VIEW LEADERBOARD" />
        </section>

        <img
          className="absolute bottom-[14px] left-[15px] w-[45px]"
          src="/images/veg_disclainer.svg"
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

export default InformationPage;
