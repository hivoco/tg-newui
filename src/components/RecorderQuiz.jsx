import { useNavigate, useSearchParams } from "react-router-dom";
import useVoiceRecorder from "../utils/useVoiceRecorder";
import axios from "../api/instance";

import {
  blobToBase64,
  debounce,
  micOffSound,
  micOnSound,
  openAI_STT,
} from "../utils/helperFunction";
import { useEffect, useState, useRef } from "react";
import Timer from "../utils/Timer";
import AudioTimer from "./AudioTimer";
// import CorrectAnswer from "./CorrectAnswer";
import Popup from "./Popup";
// import QuizLoading from "./QuizLoading";
import SoundOnAnswer from "./SoundOnAnswer";
import VerifyLoading from "./VerifyLoading";
import CommanHeader from "./CommanHeader";
import AudioPrompt from "./AudioPrompt";

function RecorderQuiz({ setIsMusicAllowed, platform }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const {
    startRecordingButtonRef,
    stopRecordingButtonRef,
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
    InVisible,
  } = useVoiceRecorder();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [seconds, setSeconds] = useState(30);
  const abortControllerRef = useRef(null);

  // const [isGivenAnswerCorrect, setIsGivenAnswerCorrect] = useState(false);
  // const [correctResponceAnswer, setCorrectResponceAnswer] = useState("");
  const [currentResponceQuestionID, setCurrentResponceQuestionID] = useState(0);

  const [isQuizQuestionLoading, setIsQuizQuestionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionToStartSound, setPermissionToStartSound] = useState(false); // changed to true
  const [openSoundPopup, setOpenSoundPopup] = useState(true);
  const [audioTime, setAudioTime] = useState(20);
  const [micOnTime, setMicOnTime] = useState(0);
  const [questionStatus, setQuestionStatus] = useState("");
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);

  let audioRef = useRef();
  const [userResponceArray, setUserResponceArray] = useState({
    uuid: sessionStorage.getItem("unique_id"),
    name: "",
    phone: "",
    quiz: [],
  });

  const getQuestion = debounce(async () => {
    setIsLoading(true);

    const responce = await axios.post(`/get_questions`, { lang: lang });
    setAllQuestions(responce?.data.questions);
    setAudioTime(Number(responce?.data?.questions[0]?.audio_time));
    setIsLoading(false);
    setOpenSoundPopup(true);
  }, 200);

  const handleOptionChange = async (event, id, clickedOption) => {
    // event is option here
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedOption(clickedOption);

    stopRecording();
    if (audioRef.current) {
      audioRef.current.src = null;
    }

    const ans = await verifyAnswer(
      event,
      id,
      true,
      lang,
      allQuestions?.[currentIndex]?.options[0],
      allQuestions?.[currentIndex]?.options[1]
    );

    setUserResponceArray({
      ...userResponceArray,
      quiz: [
        ...userResponceArray.quiz,

        {
          question: allQuestions?.[currentIndex]?.question,
          givenAns: event,
          correctAns: ans.correct_answer,
          isCorrect: ans.is_correct,
          time: 30 - Number(seconds),
        },
      ],
    });
  };

  const [replyAudio, setReplyAudio] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  const verifyAnswer = async (
    user_answer,
    question_id,
    onClick,
    lang,
    option_one,
    option_two
  ) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const signal = abortControllerRef.current.signal;
    setIsQuizQuestionLoading(true);
    setCorrectOption("");
    const responce = await axios.post(
      `/verify_answer`,
      {
        user_answer,
        question_id,
        onClick,
        lang,
        option_one,
        option_two,
        platform,
      },
      { signal }
    );
    setIsQuizQuestionLoading(false);

    if (responce?.data?.is_correct === true) {
      // rightAnswerSound();
      setQuestionStatus(true);
    } else {
      // wrongAnswerSound();
      setQuestionStatus(false);
    }

    setReplyAudio(responce?.data?.response_text);
    setCorrectOption(responce?.data?.correct_option);
    setCurrentResponceQuestionID(responce?.data?.question_id);

    return responce?.data;
  };

  const toggleMic = () => {
    if (audioRef.current) {
      audioRef.current.src = null;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleNext = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = null;
    setQuestionStatus("");
    // stopRecording();
    setCorrectOption("");
    setSelectedOption("");
    setIsQuizQuestionLoading(false);
    setSeconds(30);
    setCurrentIndex((prevIndex) => (prevIndex > 8 ? 9 : prevIndex + 1));
    if (currentIndex < 9) {
      setAudioTime(allQuestions?.[currentIndex + 1]?.audio_time);
    }
  };

  const audioTimerFunction = () => {
    if (audioRef.current) {
      audioRef.current.src = null;
    }
  };

  const handleRecordingComplete = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = null;
    if (recordingBlob) {
      blobToBase64(recordingBlob)
        .then((res) => {
          verifyAnswer(
            res,
            allQuestions?.[currentIndex]?.question_id,
            false,
            lang,
            allQuestions?.[currentIndex]?.options[0],
            allQuestions?.[currentIndex]?.options[1]
          )
            .then((ans) => {
              let event = "";
              if (ans.is_correct === true) {
                if (
                  ans.correct_option === "option_one"
                  // ans.correct_answer === allQuestions?.[currentIndex]?.options[0]
                ) {
                  setSelectedOption("option_one");
                  event = allQuestions?.[currentIndex]?.options[0];
                } else {
                  setSelectedOption("option_two");
                  event = allQuestions?.[currentIndex]?.options[1];
                }
              } else {
                if (ans.correct_option === "option_one") {
                  setSelectedOption("option_two");
                  event = allQuestions?.[currentIndex]?.options[1];
                } else {
                  setSelectedOption("option_one");
                  event = allQuestions?.[currentIndex]?.options[1];
                }
              }
              setUserResponceArray({
                ...userResponceArray,
                quiz: [
                  ...userResponceArray.quiz,

                  {
                    question: allQuestions?.[currentIndex]?.question,
                    givenAns: event,
                    correctAns: ans.correct_answer,
                    isCorrect: ans.is_correct,
                    time: 30 - Number(seconds),
                  },
                ],
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const setDataBeforeLogin = async (userResponceArray) => {
    await axios.post(`/before_login_quiz_data`, {
      uuid: userResponceArray.uuid,
      name: userResponceArray.name,
      phone: userResponceArray.phone,
      quiz: userResponceArray.quiz,
    });
  };

  const viewScore = async () => {
    await setDataBeforeLogin(userResponceArray);
    setIsMusicAllowed(true);
    navigate("/demo-admin/login");
  };

  useEffect(() => {
    if (selectedOption == "") {
      stopRecording();
      handleRecordingComplete();
    }
  }, [recordingBlob]);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = null;
    if (recordingTime > 4) {
      stopRecording();
    }
  }, [recordingTime]);

  useEffect(() => {
    const res = getQuestion();
    setanimationForUIOpacity(true);

    setAllQuestions(res);
  }, []);

  useEffect(() => {
    if (audioRef.current && permissionToStartSound) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [permissionToStartSound, currentIndex]);
  return (
    <div
      className={`${
        animationForUIOpacity
          ? "opacity-100 transition-all duration-500 delay-200 ease-in"
          : "opacity-0"
      } container bg-[url('/images/bg_quiz_screen.png')] pt-3 pb-4 flex flex-col gap-8   bg-cover min-h-screen  w-screen bg-center bg-no-repeat`}
    >
      <div
        className={`flex flex-col  ${
          isRecording ? "gap-[2.25rem]" : "gap-[3rem]"
        } `}
      >
        <div className="flex flex-col gap-7">
          {
            <CommanHeader
              setPermissionToStartSound={setPermissionToStartSound}
              currentIndex={currentIndex}
            />
          }

          <div className="flex flex-col gap-[10px] ">
            <div className="py-3 px-6 flex justify-between w-full bg-black opacity-40 bg-blend-overlay  text-lg  text-left tracking-[-1.17px] leading-[1.375rem] text-white">
              <p className=" opacity-70"> Question {currentIndex + 1}/10 </p>
              <p className="opacity-70">
                <Timer
                  seconds={seconds}
                  setSeconds={setSeconds}
                  onTimeout={handleNext}
                  index={currentIndex}
                  isQuizQuestionLoading={isQuizQuestionLoading}
                  autoSubmit={viewScore}
                />
              </p>
            </div>
            <h1 className=" px-6 font-Barlow font-medium text-[1.375rem] leading-[1.625rem] text-white text-center -tracking-[0.75px] ">
              {allQuestions?.[currentIndex]?.question}
            </h1>
          </div>
        </div>

        <div
          className={`flex flex-col items-center ${
            isRecording ? "gap-[2.25rem]" : "gap-[3rem]"
          } `}
        >
          <div
            onClick={() => toggleMic()}
            className={`${
              isRecording
                ? "bg-[url('/images/btn_recording.png')] flex flex-col  justify-center items-center  bg-[length:9.875rem_11.375rem]  w-[9.875rem] h-[11.375rem]"
                : " bg-[url('/images/btn_record.png')]  flex  justify-center items-center  bg-[length:8.43rem_9.81rem]  w-[8.43rem] h-[9.81rem]"
            }   
            bg-center  bg-no-repeat  w-[9.875rem] h-[11.375rem] 
            ${
              selectedOption.trim() != ""
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto	"
            }`}
          >
            {isRecording && (
              <>
                <img
                  className="h-[3.375rem]"
                  src="/images/soundvaves.svg"
                  alt="btn_record.png"
                />
                <div className="flex items-center font-Barlow text-lg leading-[22px] -tracking-[1.17px] text-center text-white font-medium">
                  <span>Listening</span>
                  <span className="dot1 ">.</span>
                  <span className="dot2 ">.</span>
                  <span className="dot3 ">.</span>
                </div>
              </>
            )}
          </div>

          <div className="flex  flex-col gap-[0.625rem] font-RiftSoft px-[1.945rem] w-full ">
            <label //option 1
              style={{ backgroundSize: "100% 100%" }}
              onClick={() =>
                handleOptionChange(
                  allQuestions?.[currentIndex]?.options[0],
                  allQuestions?.[currentIndex]?.question_id,
                  "option_one"
                )
              }
              className={`${
                correctOption === "option_one"
                  ? currentResponceQuestionID ==
                    allQuestions?.[currentIndex]?.question_id
                    ? "bg-[url('/images/checked_option.png')] text-white"
                    : "bg-[url('/images/option_field.png')]"
                  : "bg-[url('/images/option_field.png')]"
              }  ${
                selectedOption != ""
                  ? "pointer-events-none"
                  : "pointer-events-auto	"
              }
              } w-full	  outline-none bg-no-repeat bg-center bg-contain  flex justify-between items-center  font-light text-2xl    tracking-[-0.48px] leading-[29px] text-[#012A85]   py-[17px] px-6`}
            >
              <span className="whitespace-nowrap	overflow-x-scroll w-[80%] ">
                {allQuestions
                  ? allQuestions?.[currentIndex]?.options[0]
                  : "option 1"}
              </span>
              <span>
                <img
                  className="w-8"
                  src={
                    selectedOption === "option_one"
                      ? "/images/checked-tick.png"
                      : "/images/unchecked-tick.png"
                  }
                  alt="tick"
                />
              </span>
            </label>

            <label // option2
              style={{ backgroundSize: "100% 100%" }}
              onClick={() =>
                handleOptionChange(
                  allQuestions?.[currentIndex]?.options[1],
                  allQuestions?.[currentIndex]?.question_id,
                  "option_two"
                )
              }
              className={`${
                correctOption === "option_two"
                  ? currentResponceQuestionID ==
                    allQuestions?.[currentIndex]?.question_id
                    ? "bg-[url('/images/checked_option.png')] text-white"
                    : "bg-[url('/images/option_field.png')] text-[#012A85] "
                  : "bg-[url('/images/option_field.png')] text-[#012A85] "
              }   ${
                selectedOption != ""
                  ? "pointer-events-none"
                  : "pointer-events-auto	"
              }
               outline-none w-full bg-center bg-contain bg-no-repeat flex justify-between items-center  font-light text-[1.56rem]    tracking-[-0.5px] leading-[1.93rem]    py-[17px] px-6`}
            >
              <span className="whitespace-nowrap	overflow-x-scroll w-[80%] ">
                {allQuestions
                  ? allQuestions?.[currentIndex]?.options[1]
                  : "option 2"}
              </span>
              <span>
                <img
                  className="w-8"
                  src={
                    selectedOption === "option_two"
                      ? "/images/checked-tick.png"
                      : "/images/unchecked-tick.png"
                  }
                  alt="tick"
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex  gap-[2.625rem]   px-[2.625rem]  w-full font-RiftSoft font-light">
        <button
          onClick={() => {
            !isRecording && handleNext();
          }}
          className={` ${currentIndex < 9 ? "visible" : "invisible"}
          rounded-[2.37rem] w-1/2  border-[3px] border-solid border-white text-2xl text-center tracking-[0.72px] leading-[3.43rem] text-white  `}
        >
          SKIP
        </button>

        <button
          onClick={() => {
            {
              currentIndex === 9 ? viewScore() : handleNext();
            }
            setQuestionStatus("");
          }}
          disabled={selectedOption.trim() !== "" ? false : true}
          className={`
          ${selectedOption.trim() !== "" ? "gradient " : "opacity-50"}
            rounded-[2.37rem] w-1/2  border-[3px] border-solid border-white text-2xl  text-center tracking-[0.72px] leading-[3.43rem] text-white `}
        >
          SUBMIT
        </button>
      </div>

      {permissionToStartSound ? (
        <audio
          className="hidden"
          ref={audioRef}
          src={`data:audio/wav;base64,${allQuestions?.[currentIndex]?.audio}`}
          type="audio/mpeg"
          controls
        ></audio>
      ) : (
        ""
      )}

      {permissionToStartSound && (
        <AudioTimer
          audioTime={audioTime}
          setAudioTime={setAudioTime}
          onTimeout={audioTimerFunction}
          isAnswered={isRecording}
        />
      )}

      {isLoading && <VerifyLoading />}
      {isQuizQuestionLoading && <VerifyLoading />}
      {openSoundPopup && (
        <AudioPrompt
          setOpenSoundPopup={setOpenSoundPopup}
          setPermissionToStartSound={setPermissionToStartSound}
        />
      )}

      <SoundOnAnswer
        questionStatus={questionStatus}
        replyAudio={replyAudio}
        setQuestionStatus={setQuestionStatus}
        setReplyAudio={setReplyAudio}
        language={lang.toLowerCase()}
      />
    </div>
  );
}

export default RecorderQuiz;
