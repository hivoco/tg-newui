import GradientButton from "./GradientButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/instance.js";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const handleData = async () => {
    if (!phone) {
      return;
    }
    const d = await axios.post(
      `/after_login_update
      `,
      {
        name: name,
        phone: phone,
        uuid: sessionStorage.getItem("unique_id"),
      }
    );
    sessionStorage.setItem("user_data", JSON.stringify(d.data));
    navigate("/result/access-your-leader");
  };

  return (
    <div className="flex flex-col gap-6  bg-[url('/images/Login-bg.png')] bg-no-repeat bg-center  w-screen min-h-fit pt-[2.37rem] pb-[5.6rem] px-10">
      <div className="flex flex-col gap-[3.5rem]">
        <div className=" flex flex-col gap-3 items-center ">
          <img
            className="w-[3.75rem] "
            src="/images/tgp-logo.svg"
            alt="tgp-logo"
          />
          <div className="flex flex-col items-center">
            <img
              className="h-[9.5rem]"
              src="/images/game-logo.png"
              alt="game-logo"
            />
            <img
              className="h-11"
              src="/images/tag@2x.png"
              alt=" ai powered tag"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-RiftSoft font-semibold text-[2.68rem] text-white text-left leading-[3.19rem]">
            Sign Up & Play
          </h1>

          <div className="flex flex-col gap-4">
            <input
              className="font-RiftSoft font-bold text-[25px] text-[#012A85]  text-left -tracking-[0.5px] leading-[31px] outline-none rounded-[13px] py-[14px] px-6 border-[4px] border-solid border-[#C2DCE6]"
              type="text"
              inputMode="text"
              name="full-name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="FULL NAME"
              minLength={3}
              maxLength={20}
            />

            <div className="flex w-full gap-0 items-center bg-white rounded-[13px]">
              <span className="font-RiftSoft font-bold bg-white text-[25px] text-[#012A85]  text-left -tracking-[0.5px] leading-[31px] outline-none   py-[14px] pl-6 border-[4px] border-solid border-[#C2DCE6] border-r-0 rounded-tl-[13px] rounded-bl-[13px]">
                +91
              </span>

              <input
                className="font-RiftSoft font-bold  text-[25px] text-[#012A85]   text-left -tracking-[0.5px] leading-[31px] outline-none  py-[14px] pl-2 pr-6 border-[4px] border-solid border-[#C2DCE6]   border-l-0 rounded-tr-[13px] rounded-br-[13px]"
                inputMode="numeric"
                name="number"
                minLength={10}
                maxLength={10}
                placeholder=" PHONE NUMBER "
                value={phone}
                onChange={(e) => {
                  // const re = /^[0-9]*$/;
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col  gap-32 items-center ">
        <GradientButton
          title={"SIGN UP"}
          onClick={() => handleData()}
          className={"px-0 w-full"}
        />
        <img className="h-10" src="/images/HiVoco Studio@2x.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
