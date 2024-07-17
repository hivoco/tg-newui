import React, { useState, useEffect } from "react";

const DynamicLoading = ({messages}) => {
  

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(0px)",
        }}
        className="absolute inset-0 blur-md "
      ></div>
      <div
        className={`opacity-100 bg-blue p-6 rounded-xl md:w-[350px] w-[90%] h-32 flex flex-col gap-5 justify-center items-center relative `}
      >
        <img
          className="animate-spin"
          src="/images/footbal.png"
          alt="btn_record.png"
        />
        <div className="font-RiftSoft font-semibold text-2xl leading-[24px] tracking-[-0.25px] text-center text-white animate-fadeIn">
          {messages[currentMessageIndex]}
        </div>
      </div>
    </div>

    // </div>
  );
};

export default DynamicLoading;
