import React from "react";

function Finish() {
  return (
    <div
      className={`   border border-blue-800
        container bg-[url('/images/SignedJerseys1@2x.png')] min-h-screen  w-screen   bg-center bg-cover    bg-no-repeat relative`}
    >
      <div className="flex flex-col justify-center gap-20 w-full h-screen items-center ">
        <div className="flex flex-col justify-center items-center gap-5  ">
          <img className=" " src="/images/thanks.png" alt="thanks.png" />
          <img className=" " src="/images/fyii.png" alt="thanks.png" />
        </div>

        <img
          className="w-[5.375rem] h-[5rem] "
          src="/images/tgp-logo.png"
          alt="tgp-logo.png"
        />

        <div className="flex flex-col justify-center items-center gap-5  ">
          <img className=" " src="/images/tcis.png" alt="thanks.png" />
          <img className=" " src="/images/wus.png" alt="thanks.png" />
        </div>
      </div>
      <div className="flex justify-center">
        <img
          className="absolute bottom-[1.75rem] w-[9rem]"
          src="/images/HiVoco Studio@2x.png"
          alt="game-logo.png"
        />
      </div>
    </div>
  );
}

export default Finish;
