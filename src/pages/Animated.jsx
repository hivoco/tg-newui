import { useEffect, useState } from "react";
import AnimatedFirstPage from "./AnimatedFirstPage";
import AnimatedSecondPage from "./AnimatedSecondPage";
import AnimatedThirdPage from "./AnimatedThirdPage";

function Animated() {
  const [changeScreen, setChangeScreen] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setChangeScreen(2);
    }, 3000);
    setTimeout(() => {
      setChangeScreen(3);
    }, 6000);
  }, []);
  return (
    <>
      {changeScreen === 1 && <AnimatedFirstPage />}
      {changeScreen === 2 && <AnimatedSecondPage />}
      {changeScreen === 3 && <AnimatedThirdPage />}
    </>
  );
}

export default Animated;
