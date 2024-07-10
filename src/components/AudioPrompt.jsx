import Popup from "./Popup";

function AudioPrompt({ setOpenSoundPopup, setPermissionToStartSound }) {
  return (
    <Popup bg={"tranparent"}>
      <div
        className="w-72  modal-css py-4 px-6 flex flex-col gap-9 items-center rounded-xl  shadow-[0px_8px_16px_-8px_#0000004D]  shadow-[0px_13px_27px_-5px_#32325D40 bg-white
]"
      >
        <div className="flex flex-col items-center gap-[18px] ">
          <img className="w-24" src="/images/sound.gif" alt="alexa" />

          <p className="font-RiftSoft font-semibold text-2xl leading-[24px] tracking-[-0.25px] text-center text-[#222124]">
            Would you like to listen to the questions?
          </p>
        </div>

        <div className="flex gap-3 ">
          <button
            onClick={() => {
              setPermissionToStartSound(false);
              setOpenSoundPopup(false);
            }}
            className="rounded-full text-xl opacity-40   border-[3px] font-RiftSoft   font-semibold leading-[15px] text-center  py-[13px] px-[45px]  text-[#012A85] border-[#1D55FD]"
          >
            NO
          </button>
          <button
            onClick={() => {
              setPermissionToStartSound(true);
              setOpenSoundPopup(false);
            }}
            className="bg-gradient-to-r from-[#0071C7] from-10% via-[#960000] via-50%  to-[#960000] to-90% rounded-full   font-RiftSoft   font-semibold leading-[15px] text-center text-xl   py-[13px] px-[45px]  text-white"
          >
            YES
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default AudioPrompt;
