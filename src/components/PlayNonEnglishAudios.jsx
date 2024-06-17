import { useEffect, useRef } from "react";

function PlayNonEnglishAudios({
  questionStatus,
  replyAudio,
  setQuestionStatus,
  setReplyAudio,
}) {
  const soundRef = useRef();

  useEffect(() => {
    if (questionStatus !== "" && replyAudio) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
      setReplyAudio("");
    }
  }, [questionStatus, replyAudio]);

  return (
    <audio
      ref={soundRef}
      onEnded={() => setQuestionStatus("")}
      type="audio/wav"
      src={`data:audio/wav;base64,${replyAudio}`}
    ></audio>
  );
}

export default PlayNonEnglishAudios;
