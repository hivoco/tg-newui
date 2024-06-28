import { useNavigate } from "react-router-dom";

function CommanHeader({ setPermissionToStartSound, currentIndex }) {
  const navigate = useNavigate();
  return (
    <header className="flex  items-center    justify-between   px-6  w-full">
      <img
        className=" h-[3.75rem]"
        src="/images/tgp-logo.png"
        alt="tgp-logo.png"
        onClick={() => navigate("/")}
      />

      <img
        className="h-[3.125rem]   "
        src="/images/game-logo.png"
        alt="game-logo.png"
      />

      <div
        className={`flex flex-col  items-end     gap-[1.19rem]    ${
          currentIndex === 0
            ? "flex flex-col items-end gap-2"
            : ""
        }`}
      >
        <img
          onClick={() => navigate("/")}
          className="h-[22px] object-contain"
          src="/images/btn-exit.png"
          alt="exit button"
        />

        {/* {currentIndex === 0 && ( */}
          <img
            onClick={() => setPermissionToStartSound(false)}
            className="h-[22px] object-contain"
            src="/images/btn-mute.png"
            alt="button mute"
          />
        {/* // )} */}
      </div>
    </header>
  );
}

export default CommanHeader;
