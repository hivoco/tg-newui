const Quiz = () => {
  return (
    <div className="bg-[url('/public/images/bg_quiz_screen.png')]  h-screen  w-screen bg-center bg-no-repeat ">
      <div className="flex flex-col gap-10">
        <header className="flex gap-[34px] items-center  pt-6 px-6">
          <img
            className="w-[83.21px] h-[73px]"
            src="/public/images/tgp-logo.png"
            alt="tgp-logo.png"
          />

          <img
            className="w-[147px] h-[62px]"
            src="/public/images/game-logo.png"
            alt="game-logo.png"
          />

          <div className="flex flex-col gap-[19px]">
            <img
              className="w-[73px] "
              src="/public/images/btn-exit.png"
              alt="btn-exit.png"
            />

            <img
              className="w-[84px]"
              src="/public/images/btn-mute.png"
              alt="btn-mute.png"
            />
          </div>
        </header>

        <div className="flex flex-col gap-[9px]">
          <div className="px-6 py-[13px] flex justify-between w-full bg-black opacity-40 bg-blend-overlay  text-lg  text-left tracking-[-1.17px] leading-[22px] text-white">
            <p className=" opacity-70">Question 09/10</p>

            <p className="opacity-70">00:09</p>
          </div>

          <h1 className="shadow-[] font-Barlow font-medium text-[28px] leading-[34px] text-white text-center -tracking-[1.4px] ">
            Which player famously scored the "Hand of God" goal for Argentina in
            the 1986 FIFA World Cup?
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[60px]">
        <img
          className="w-[147px] h-[171px]"
          src="/public/images/btn_record.png"
          alt="btn_record.png"
        />

        <div className="flex flex-col gap-[27px] font-RiftSoft px-[51px] w-full">
          <div className=" box-border flex justify-between py-4 px-6 bg-white  border-[4px] border-solid  border-[#9600003D]">
            <label className=" font-light text-[25px] text-center  uppercase tracking-[-0.5px] leading-[31px] text-[#012A85]">
              DIEGO MARADONA
            </label>
            <input className="w-8 h-8" type="radio" name="" id="" />
          </div>

          <div className="flex justify-between py-4 px-6 bg-white  border-[4px] border-solid  border-[#9600003D]">
            <label className="text-[25px] text-center  uppercase tracking-[-0.5px] leading-[31px] text-[#012A85]">
              DIEGO MARADONA
            </label>
            <input className="w-8 h-8" type="radio" name="" id="" />
          </div>
        </div>

      </div>

      <div className="flex  gap-8 w-full h-[76px] px-[51px]">
        <img src="/public/images/btn_skip.png" alt="" />
        <img src="/public/images/btn_skip.png" alt="" />
        {/* 
        <button className="opacity-45">skip</button>
        <button className="opacity-45">submit</button> */}
      </div>
    </div>
  );
};

export default Quiz;
