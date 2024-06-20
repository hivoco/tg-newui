import { useNavigate } from "react-router-dom";

function CommanHeader({ setPermissionToStartSound, currentIndex }) {
  const navigate = useNavigate();
  return (
    <header className="flex  items-center gap-3  px-6  w-full">
      <img
        className="w-[5.25rem] "
        src="/images/tgp-logo.png"
        alt="tgp-logo.png"
        onClick={() => navigate("/")}
      />

      <img
        className="w-[9.18rem] "
        src="/images/game-logo.png"
        alt="game-logo.png"
      />

      <div className="flex flex-col items-center gap-2  w-full">
        <img
          onClick={() => navigate("/")}
          className="h-6 object-contain"
          src="/images/btn-exit.png"
          alt="exit button"
        />

        {currentIndex === 0 && (
          <img
            onClick={() => setPermissionToStartSound(false)}
            className="h-6 object-contain"
            src="/images/btn-mute.png"
            alt="button mute"
          />
        )}
      </div>
    </header>
  );
}

export default CommanHeader;
