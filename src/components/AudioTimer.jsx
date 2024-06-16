import {  useEffect, useState } from "react";

const AudioTimer = ({ onTimeout, audioTime, setAudioTime, isAnswered }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAudioTime((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isInitialRender) {
      if (audioTime === 0 && !isAnswered) {
        console.log("fgf");
        onTimeout();
      }
    } else {
      setIsInitialRender(false);
    }
  }, [audioTime]);

  return null;
};

export default AudioTimer;
