import React from "react";
import Popup from "./Popup";

function VerifyLoading() {
  return (
    <Popup bg={"transparent"}>
      <div className=" flex flex-col justify-center items-center gap-2">
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
  );
}

export default VerifyLoading;
