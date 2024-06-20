import { useEffect, useState } from "react";
import CommanHeader from "./CommanHeader";

function LeaderBoard() {
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    const res = JSON.parse(sessionStorage.getItem("user_data"));
    setData(res?.winner);
    setanimationForUIOpacity(true);
  }, []);

  const table = data?.map((el, index) => {
    return (
      index > 2 && (
        <div
          key={el.rank}
          className={`  py-[6.5px]   ${
            index === data.length - 1
              ? "bg-gradient-to-r from-[#14915F] to-[#05DE6C] px-11  mt-[1px "
              : "bg-[#00195080] mx-6 rounded-lg px-5"
          } flex justify-between  items-center `}
        >
          <div className=" flex   gap-5 items-center">
            <span className=" font-Barlow font-bold text-xl leading-[1.5rem] text-white w-6">
           {el.rank}
              <sup>th</sup>
            </span>

            <img
              src={`${
                index === data.length - 1
                  ? "/images/green-player-icon.svg"
                  : "/images/player-icon.png"
              }  `}

              className="w-11"
              // className={` ${index === data.length - 1?     'w-10':"w-11"         }   `}
              alt="player-icon.png"
            />
          </div>

          <div className="flex w-3/5  justify-between items-center">
            <p className="text-nowrap font-RiftSoft font-normal text-lg text-center tracking-[-0.36px] leading-[22px] text-white">
              {el.name}
            </p>
            <p className="text-nowrap font-Barlow font-semibold  leading-[22px] text-white text-right">
              Pts. {el.score}
            </p>
          </div>
        </div>
      )
    );
  });

  return (
    <div
      className={`${
        animationForUIOpacity
          ? "opacity-100 transition-all duration-500 delay-200 ease-in"
          : "opacity-0"
      } container bg-[url('/images/LeaderBoardBg.png')]  min-h-screen bg-cover flex flex-col gap-6   w-screen pt-6 bg-center bg-no-repeat`}
    >
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-[2.12rem] ">
          {<CommanHeader />}
          <div
            className=" bg-[url('/images/black-hexagon.png')]   bg-[length:88%]  bg-no-repeat  bg-center   my-auto    py-[0.875rem] flex justify-center items-center"
            alt="black-hexagon.png"
          >
            <img
              className="h-8 "
              src="/images/Leaderboard@2x.png"
              alt="leaderboard-logo.png"
            />
          </div>
        </div>

        <div className="flex items-end px-[1.82rem]">
          <div className="flex flex-col gap-[0.85rem] items-center ">
            <div className="flex flex-col gap-[4.5px] items-center">
              <img
                src="/images/trophy-silver.svg"
                className="w-12"
                alt="trophy-silver.png"
              />

              <img
                src="/images/player-2nd.svg"
                className="w-[7.3rem]"
                alt="player-2nd.png"
              />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="font-RiftSoft text-lg text-center  tracking-[-0.36px] leading-[22px] uppercase text-white">
                {data[1]?.name}
              </h2>
              <p className="font-Barlow text-lg leading-[22px] text-white">
                {data[1]?.score}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[0.7rem] items-center mb-2 ">
            <div className="flex flex-col gap-1 items-center">
              <img
                src="/images/trophy-gold.svg"
                className="w-12"
                alt="trophy-gold.png"
              />

              <img
                src="/images/player-1st.svg"
                className="w-[9.4rem]"
                alt="player-1st.png"
              />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="font-RiftSoft text-lg text-center  tracking-[-0.36px] leading-[22px] uppercase text-white">
                {data[0]?.name}
              </h2>
              <p className="font-Barlow text-lg leading-[22px] text-white">
                {data[0]?.score}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[0.85rem] items-center ">
            <div className="flex flex-col gap-[4.5px] items-center">
              <img
                src="/images/trophy-bronze.svg"
                className="w-12"
                alt="trophy-bronze.png"
              />

              <img
                src="/images/player-3rd.svg"
                className="w-[7.3rem]"
                alt="player-3rd.png"
              />
            </div>

            <div className="flex flex-col items-center">
              <h2 className="font-RiftSoft text-lg text-center  tracking-[-0.36px] leading-[22px] uppercase text-white">
                {data[2]?.name}{" "}
              </h2>
              <p className="font-Barlow text-lg leading-[22px] text-white">
                {data[2]?.score}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[2.8px]">{table}</div>
    </div>
  );
}

export default LeaderBoard;
