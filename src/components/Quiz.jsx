import { useNavigate, useSearchParams } from "react-router-dom";
import CommanHeader from "./CommanHeader";
import axios from "../api/instance.js";
import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/helperFunction";
import Timer from "../utils/Timer.jsx";

import AudioTimer from "./AudioTimer.jsx";
import useSpeechRecognition from "../utils/useSpeechRecognition";
import VerifyLoading from "./VerifyLoading.jsx";
import SoundOnAnswer from "./SoundOnAnswer.jsx";

function Quiz({ setIsMusicAllowed, platform }) {
  const {
    recognition,
    speechText,
    setSpeechText,
    startSpeechRecognition,
    stopSpeechRecognition,
    imageRef,
  } = useSpeechRecognition();

  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const navigate = useNavigate();
  let audioRef = useRef();
  const abortControllerRef = useRef(null);
  const [animationForUIOpacity, setanimationForUIOpacity] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isGivenAnswerCorrect, setIsGivenAnswerCorrect] = useState(false);
  const [correctResponceAnswer, setCorrectResponceAnswer] = useState("");
  const [isQuizQuestionLoading, setIsQuizQuestionLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [seconds, setSeconds] = useState(30);

  const [permissionToStartSound, setPermissionToStartSound] = useState(true); // changed to true
  const [openSoundPopup, setOpenSoundPopup] = useState(true);

  const [audioTime, setAudioTime] = useState(20);

  const [micOnTime, setMicOnTime] = useState(0);

  const [questionStatus, setQuestionStatus] = useState("");

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

  useEffect(() => {
    const res = getQuestion();
    setAllQuestions(res);
    setanimationForUIOpacity(true);
  }, []);

  const handleNext = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = null;
    setQuestionStatus("");
    setCorrectOption("");
    setIsQuizQuestionLoading(false);
    setSeconds(30);
    setMicOnTime(0);
    setSpeechText("");
    setSelectedOption("");
    setIsGivenAnswerCorrect(false);
    setCorrectResponceAnswer("");
    setIsAnswered(false);
    setCurrentIndex((prevIndex) => (prevIndex > 8 ? 9 : prevIndex + 1));
    if (currentIndex < 9) {
      setAudioTime(allQuestions?.[currentIndex + 1]?.audio_time);
    }
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
        platform,
        option_one,
        option_two,
      },
      { signal }
    );

    setIsAnswered(false);
    setIsQuizQuestionLoading(false);

    if (responce?.data?.is_correct === true) {
      setQuestionStatus(true);
    } else {
      setQuestionStatus(false);
    }

    setReplyAudio(responce?.data?.response_text);
    setCorrectOption(responce?.data?.correct_option);
    return responce?.data;
  };

  const handleOptionChange = async (event, id, clickedOption) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedOption(clickedOption);
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

    setIsGivenAnswerCorrect(ans.is_correct);

    setCorrectResponceAnswer(ans.correct_answer);

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

  const audioTimerFunction = () => {
    if (audioRef.current) {
      audioRef.current.src = null;
    }
    if (selectedOption == "") {
      setIsAnswered(true);
      enter(allQuestions?.[currentIndex]?.question_id);
    }
  };

  const enter = async (question_id) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      return
    }
    let value = speechText.trim();

    setMicOnTime(micOnTime + 1);

    stopSpeechRecognition();

    if (value) {
      const ans = await verifyAnswer(
        speechText,
        question_id,
        false,
        lang,
        allQuestions?.[currentIndex]?.options[0],
        allQuestions?.[currentIndex]?.options[1]
      );

      let event = "";
      if (ans.is_correct === true) {
        if (ans.correct_option === "option_one") {
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

      setIsGivenAnswerCorrect(ans.is_correct);
      setCorrectResponceAnswer(ans.correct_answer);
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
      setSpeechText("");
    } else {
      if (selectedOption != "" || micOnTime > 0) {
        setIsAnswered(false);
        setMicOnTime(0);
        return;
      }
      startSpeechRecognition();
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

    navigate("/login");
  };

  return (
    <div
      className={`${
        animationForUIOpacity
          ? "opacity-100 transition-all duration-500 delay-200 ease-in"
          : "opacity-0"
      } container bg-[url('/images/bg_quiz_screen.png')] pt-6 pb-8 flex flex-col gap-[3.71rem]  bg-cover min-h-screen  w-screen bg-center bg-no-repeat`}
    >
      <div className="flex flex-col gap-[3.125rem]">
        <div className="flex flex-col gap-10">
          {
            <CommanHeader
              setPermissionToStartSound={setPermissionToStartSound}
              currentIndex={currentIndex}
            />
          }
          <div className="flex flex-col gap-[9px] ">
            <div className="py-3   px-6 flex justify-between w-full bg-black opacity-40 bg-blend-overlay  text-lg  text-left tracking-[-1.17px] leading-[22px] text-white">
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

            {/* <div className="h-[9.375rem]"> */}
              <h1 className=" px-6 font-Barlow font-medium text-[1.75rem] leading-[2.125rem] text-white text-center tracking-[1.4px] ">
                {allQuestions?.[currentIndex]?.question}
              </h1>
            {/* </div> */}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 ">
          {/* w-[48%]  h-1/4 */}
          <div
            ref={imageRef}
            onClick={() => {
              audioTimerFunction();
            }}
            className={`${
              isAnswered
                ? "bg-[url('/images/btn_recording.png')] flex flex-col gap-[3px] justify-center items-center  bg-[length:13rem_15rem]"// w-[12.93rem] h-[15.06rem]    
                : " bg-[url('/images/btn_record.png')]  flex  justify-center items-center  bg-[length:9rem_10.7rem]"//w-[9.18rem] h-[10.68rem]  
            }   
            bg-center  bg-no-repeat  w-[12.93rem] h-[15.06rem] 

            ${
              selectedOption.trim() != ""
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto	"
            }`}
          >
            {isAnswered && (
              <>
                <img
                  className="h-14"
                  src="/images/soundvaves.svg"
                  alt="btn_record.png"
                />
                <div className="flex items-center font-RiftSoft text-lg text-center text-white mt-2 font-extralight tracking-wide ">
                  <span>Listning</span>
                  <span className="dot1 ">.</span>
                  <span className="dot2 ">.</span>
                  <span className="dot3 ">.</span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6 font-RiftSoft px-[3.18rem] w-full ">
            <label //option 1
              onClick={() =>
                handleOptionChange(
                  allQuestions?.[currentIndex]?.options[0],
                  allQuestions?.[currentIndex]?.question_id,
                  "option_one"
                )
              }
              className={`${
                correctOption === "option_one"
                  ? "bg-[url('/images/checked_option.png')] text-white"
                  : "bg-[url('/images/option_field.png')]"
              }  ${
                selectedOption != ""
                  ? "pointer-events-none"
                  : "pointer-events-auto	"
              } 	  outline-none bg-no-repeat bg-center bg-contain  flex justify-between items-center  font-light text-[1.56rem]    tracking-[-0.5px] leading-[1.93rem] text-[#012A85]   py-4 px-6 `}
            >
              <span className="truncate min-w-[9.125rem]">
                {allQuestions
                  ? allQuestions?.[currentIndex]?.options[0]
                  : "option 1"}
              </span>

              <span>
                <img
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
              onClick={() =>
                handleOptionChange(
                  allQuestions?.[currentIndex]?.options[1],
                  allQuestions?.[currentIndex]?.question_id,
                  "option_two"
                )
              }
              className={`${
                correctOption === "option_two"
                  ? "bg-[url('/images/checked_option.png')] text-white"
                  : "bg-[url('/images/option_field.png')] text-[#012A85] "
              }   ${
                selectedOption != ""
                  ? "pointer-events-none"
                  : "pointer-events-auto	"
              } 	 outline-none bg-center bg-contain bg-no-repeat flex justify-between items-center  font-light text-[1.56rem]    tracking-[-0.5px] leading-[1.93rem]   py-4 px-6 `}
            >
              <span className="max-w-[9.125rem] truncate">
                {allQuestions
                  ? allQuestions?.[currentIndex]?.options[1]
                  : "option 2"}
              </span>
              <span>
                <img
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

      <div className="flex  gap-8   px-[3.18rem] w-full font-RiftSoft font-light">
        <button
          onClick={() => {
            !isAnswered && handleNext();
          }}
          disabled={isAnswered}
          className={` ${currentIndex < 9 ? "visible" : "invisible"}  ${
            !isAnswered ? "opacity-100" : "opacity-40"
          } rounded-[2.37rem] w-1/2  border-[3px] border-solid border-white text-[1.5rem] text-center tracking-[0.72px] leading-[3.43rem] text-white  `}
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
            rounded-[2.37rem] w-1/2  border-[3px] border-solid border-white text-[1.5rem] text-center tracking-[0.72px] leading-[3.43rem] text-white `}
        >
          SUBMIT
        </button>
      </div>

      {permissionToStartSound ? (
        <audio
          ref={audioRef}
          autoPlay={true}
          src={`data:audio/wav;base64,${allQuestions?.[currentIndex]?.audio}`}
          type="audio/mpeg"
        ></audio>
      ) : (
        ""
      )}

      {permissionToStartSound && (
        <AudioTimer
          audioTime={audioTime}
          setAudioTime={setAudioTime}
          onTimeout={audioTimerFunction}
          isAnswered={isAnswered}
        />
      )}

      {isLoading && <VerifyLoading />}
      {isQuizQuestionLoading && <VerifyLoading />}

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

export default Quiz;
