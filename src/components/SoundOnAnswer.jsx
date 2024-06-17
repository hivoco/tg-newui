// import { useEffect, useRef } from "react";
import PlayNonEnglishAudios from "./PlayNonEnglishAudios.jsx";
import TextToSpeech from "./TextToSpeech.jsx";

function SoundOnAnswer({
  questionStatus,
  setQuestionStatus,
  replyAudio,
  setReplyAudio,
  language,
}) {
  return language === "english" ? (
    <TextToSpeech
      questionStatus={questionStatus}
      setQuestionStatus={setQuestionStatus}
      replyAudio={replyAudio}
      setReplyAudio={setReplyAudio}
    />
  ) : (
    <PlayNonEnglishAudios
      setQuestionStatus={setQuestionStatus}
      questionStatus={questionStatus}
      replyAudio={replyAudio}
      setReplyAudio={setReplyAudio}
    />
  );
}

export default SoundOnAnswer;
