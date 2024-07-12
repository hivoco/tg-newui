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
        name: name.slice(0, 10),
        phone: phone,
        uuid: sessionStorage.getItem("unique_id"),
      }
    );
    sessionStorage.setItem("user_data", JSON.stringify(d.data));
    navigate("/result/access-your-leader");
  };

  return (
    <div className="flex flex-col gap-9  bg-[url('/images/Login-bg.png')] bg-no-repeat bg-center  w-screen min-h-screen pt-[2.37rem] pb-[7.25rem] px-9">
      <div className="flex flex-col gap-[2.19rem]">
        <div className=" flex flex-col gap-[14px] items-center ">
          <img
            className="h-[3.75rem] "
            src="/images/tgp-logo.svg"
            alt="tgp-logo"
          />
          <div className="flex flex-col gap-2 items-center">
            <img
              className="h-[8.75rem]"
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

        <div className="flex flex-col gap-9 items-center">
          <h1 className="font-RiftSoft font-semibold text-[2rem] text-white text-center leading-[2.6875rem] tracking-[0.96px]">
            Sign Up & Play
          </h1>

          <div className="flex flex-col gap-[0.875rem]">
            <input
              className="font-RiftSoft font-bold text-[25px] text-[#012A85]  text-left -tracking-[0.5px] leading-[1.9375rem] outline-none rounded-[13px] py-[14px] px-6 border-[4px] border-solid border-[#C2DCE6]"
              type="text"
              inputMode="text"
              name="full-name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="FULL NAME"
              minLength={3}
              maxLength={10}
            />

            <div className="flex w-full gap-0 items-center   bg-[#C2DCE6]  rounded-[13px]">
              <span className="font-RiftSoft font-bold bg-white text-[1.5625rem] text-[#012A85]  text-left -tracking-[0.5px] leading-[1.9375rem] outline-none   py-[14px] pl-6 border-[4px] border-solid border-[#C2DCE6] border-r-0  rounded-r-none rounded-tl-[13px] rounded-bl-[13px]">
                +91
              </span>

              <input
                className=" font-RiftSoft font-bold  text-[1.5625rem] text-[#012A85]   text-left -tracking-[0.5px] leading-[1.9375rem]  outline-none  py-[14px] pl-2 pr-6 border-[4px] border-solid border-[#C2DCE6]   border-l-0 rounded-l-none rounded-tr-[13px] rounded-br-[13px]"
                inputMode="numeric"
                name="number"
                minLength={10}
                maxLength={10}
                placeholder=" PHONE NUMBER "
                value={phone}
                onChange={(e) => {
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

      <div className=" flex flex-col  gap-[2.625rem]  items-center ">
        <GradientButton
          title={"SIGN UP"}
          onClick={handleData}
          className={
            "rounded-[38px] font-semibold  text-2xl tracking-[0.72px] leading-[3.4375rem] px-[4.25rem]"
          }
        />
        <img
          className="h-10"
          src="/images/HiVoco Studio@2x.png"
          alt="HiVoco Studio logo"
        />
      </div>
    </div>
  );
};

export default Login;
