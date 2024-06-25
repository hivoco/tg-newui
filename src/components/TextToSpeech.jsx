import { useEffect, useRef, useState } from "react";

const TextToSpeech = ({
  setQuestionStatus,
  replyAudio,
  setReplyAudio,
  questionStatus,
}) => {
  // console.log('q status ',questionStatus);
  const soundRef = useRef();
  const wrongOrRightRef = useRef();

  const [audioUrl, setAudioUrl] = useState("");
  const API_KEY =   'sk-proj-BeLQ0uFPzdX6835TeUGCT3BlbkFJKCpNBcXhE63skhEm8yie'
  const handleTextToSpeech = async () => {
    setAudioUrl("");

    const data = {
      model: "tts-1",
      input: replyAudio,
      voice: "nova",
    };

    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        const url = window.URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        console.error("Error in response:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (questionStatus !== "") {
      handleTextToSpeech();
    }
  }, [questionStatus]);

  useEffect(() => {
    if (questionStatus !== "" && !audioUrl) {
      wrongOrRightRef.current.play();
    } else if (questionStatus !== "" && audioUrl) {
      wrongOrRightRef.current.pause();
      soundRef.current.play();
    } else {
      soundRef.current.pause();
      setReplyAudio("");
      setAudioUrl("");
    }
  }, [audioUrl, questionStatus]);

  return (
    <>
      <audio
        ref={wrongOrRightRef}
        src={
          questionStatus !== ""
            ? questionStatus
              ? "/sounds/rightAnswer.mp3"
              : "/sounds/wrongAnswer.mp3"
            : ""
        }
      ></audio>
      <audio
        // controls
        ref={soundRef}
        src={audioUrl}
        type="audio/mpeg"
        onEnded={() => {
          setQuestionStatus("");
          // setReplyAudio("");
          // setAudioUrl("");
        }}
      ></audio>
    </>
  );
};

export default TextToSpeech;
