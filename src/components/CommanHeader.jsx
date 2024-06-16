import { useNavigate } from "react-router-dom";

function CommanHeader({ setPermissionToStartSound }) {
  const navigate = useNavigate();
  return (
    <header className="flex gap-[2.125rem] items-center   px-6 ">
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

      <div className="flex flex-col gap-[1.19rem]">
        <img
          className="w-[73px] "
          src="/images/btn-exit.png"
          alt="btn-exit.png"
        />

        <img
          onClick={() => setPermissionToStartSound(true)}
          className="w-[84px]"
          src="/images/btn-mute.png"
          alt="btn-mute.png"
        />
      </div>
    </header>
  );
}

export default CommanHeader;
