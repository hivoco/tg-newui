import { useNavigate, useSearchParams } from "react-router-dom";
import CommanHeader from "./CommanHeader";
// import AudioPrompt from "./AudioPrompt"
// import Layout from "../../Layout";
import axios from "../api/instance.js";
import { useEffect, useRef, useState } from "react";
// import { setDataBeforeLogin } from "../api/endpoint";
import {
  debounce,
  // decodeUnicode,
  // micOffSound,
  // micOnSound,
} from "../utils/helperFunction";
import Timer from "../utils/Timer.jsx";
// import Popup from "./Popup";
// import QuizLoading from "./QuizLoading";
// import AudioPrompt from "./AudioPrompt";
import AudioTimer from "./AudioTimer.jsx";
import useSpeechRecognition from "../utils/useSpeechRecognition";
// import Popup from "./Popup";
// import CorrectAnswer from "../components/CorrectAnswer";
// import SoundOnAnswer from "./SoundOnAnswer";

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
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isGivenAnswerCorrect, setIsGivenAnswerCorrect] = useState(false);
  const [correctResponceAnswer, setCorrectResponceAnswer] = useState("");
  const [isQuizQuestionLoading, setIsQuizQuestionLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [seconds, setSeconds] = useState(100);

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
  }, []);

  const handleNext = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = null;
    setCorrectOption("");
    setIsQuizQuestionLoading(false);
    setSeconds(100);
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

    if (responce?.data?.is_correct == "true") {
      // rightAnswerSound();
      setQuestionStatus(true);
      // setTimeout(() => {
      //   setQuestionStatus("");
      // }, 2000);
    } else {
      setQuestionStatus(false);
      // setTimeout(() => {
      //   setQuestionStatus("");
      // }, 1000);
    }

    setReplyAudio(responce?.data?.response_text);
    setCorrectOption(responce?.data?.correct_option);
    return responce?.data;
  };

  const handleOptionChange = async (event, id) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedOption(event);
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
    console.log(isGivenAnswerCorrect);

    setCorrectResponceAnswer(ans.correct_answer);
    console.log(correctResponceAnswer);

    setUserResponceArray({
      ...userResponceArray,
      quiz: [
        ...userResponceArray.quiz,

        {
          question: allQuestions?.[currentIndex]?.question,
          givenAns: event,
          correctAns: ans.correct_answer,
          isCorrect: ans.is_correct,
          time: 20 - Number(seconds),
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
    let value = speechText.trim();

    setMicOnTime(micOnTime + 1);

    stopSpeechRecognition();

    // if(isAnswered)

    if (value) {
      // micOffSound();

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
        if (ans.correct_answer === allQuestions?.[currentIndex]?.options[0]) {
          setSelectedOption(allQuestions?.[currentIndex]?.options[0]);
          event = allQuestions?.[currentIndex]?.options[0];
        } else {
          setSelectedOption(allQuestions?.[currentIndex]?.options[1]);
          event = allQuestions?.[currentIndex]?.options[1];
        }
      } else {
        if (ans.correct_answer === allQuestions?.[currentIndex]?.options[0]) {
          setSelectedOption(allQuestions?.[currentIndex]?.options[1]);
          event = allQuestions?.[currentIndex]?.options[1];
        } else {
          setSelectedOption(allQuestions?.[currentIndex]?.options[0]);
          event = allQuestions?.[currentIndex]?.options[0];
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
            time: 20 - Number(seconds),
          },
        ],
      });
      setSpeechText("");
      // setTimeout(() => {
      //   handleNext();
      // }, 2000);
    } else {
      if (selectedOption != "" || micOnTime > 0) {
        setIsAnswered(false);
        setMicOnTime(0);
        return;
      }
      // micOnSound();
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
    const responce = await axios(
      `/your_score?uuid=${sessionStorage.getItem("unique_id")}`
    );

    setIsMusicAllowed(true);

    navigate(
      `/quiz/get-your-final-score?score=${responce.data.score}&time=${responce.data.time}&correct=${responce.data.totalCorrectAns}`
    );
  };

  return (
    <div className="bg-[url('/images/bg_quiz_screen.png')] pt-6 pb-8 flex flex-col gap-[3.75rem]  bg-cover min-h-fit  w-screen bg-center bg-no-repeat ">
      <div className="flex flex-col gap-[5.31rem]">
        <div className="flex flex-col gap-10">
          {<CommanHeader />}
          <div className="flex flex-col gap-[9px] ">
            <div className="py-3   px-6 flex justify-between w-full bg-black opacity-40 bg-blend-overlay  text-lg  text-left tracking-[-1.17px] leading-[22px] text-white">
              <p className=" opacity-70"> Question {currentIndex + 1}/10 </p>

              <p className="opacity-70">
                {
                  <Timer
                    seconds={seconds}
                    setSeconds={setSeconds}
                    onTimeout={handleNext}
                    index={currentIndex}
                    isQuizQuestionLoading={isQuizQuestionLoading}
                    autoSubmit={viewScore}
                  />
                }
              </p>
            </div>

            <h1 className=" px-6 font-Barlow font-medium text-[1.75rem] leading-[2.125rem] text-white text-center tracking-[1.4px] ">
              {allQuestions?.[currentIndex]?.question}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[3.75rem]">
          {/* w-[48%]  h-1/4 
          
          */}
          <div
            ref={imageRef}
            onClick={() => {
              audioTimerFunction();
            }}
            className={`${
              isAnswered
                ? "bg-[url('/images/btn_recording.png')] flex flex-col gap-[3px] justify-center items-center  "
                : " bg-[url('/images/btn_record.png')]  "
            }   
            bg-center bg-contain bg-no-repeat  w-[207px] h-[241px]
            ${selectedOption.trim() != "" ? "opacity-50" : "opacity-100"}`}
          >
            {isAnswered && (
              <>
                <img
                  className="h-14"
                  src="/images/soundvaves.svg"
                  alt="btn_record.png"
                />
                <p className="text-lg  -tracking-[1.17px] leading-[22px] text-center text-white">
                  Listening...
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col gap-[1.68rem] font-RiftSoft px-[3.18rem] w-full">
            <label
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
              }    bg-no-repeat bg-center bg-contain  flex justify-between items-center  font-light text-[1.56rem]    tracking-[-0.5px] leading-[1.93rem] text-[#012A85]   py-4 px-6 `}
            >
              {allQuestions
                ? allQuestions?.[currentIndex]?.options[0]
                : "option 1"}
              <span>
                <img
                  src={
                    correctOption === "option_one"
                      ? "/images/checked-tick.png"
                      : "/images/unchecked-tick.png"
                  }
                  alt="tick"
                />
              </span>
            </label>

            <label
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
              }  bg-center bg-contain bg-no-repeat flex justify-between items-center  font-light text-[1.56rem]    tracking-[-0.5px] leading-[1.93rem]   py-4 px-6 `}
            >
              {allQuestions
                ? allQuestions?.[currentIndex]?.options[1]
                : "option 2"}
              <span>
                <img
                  onClick={() => {
                    audioTimerFunction();
                  }}
                  src={
                    correctOption === "option_two"
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
            setQuestionStatus("");
          }}
          className={` ${
            currentIndex < 9 ? "visible" : "invisible"
          } rounded-[2.37rem] w-1/2  border-[3px] border-solid border-white text-[1.5rem] text-center tracking-[0.72px] leading-[3.43rem] text-white  `}
        >
          SKIP
        </button>

        <button
          // onClick={() => {
          //   setQuestionStatus("");
          //   handleNext();
          // }}
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

      {/* {openSoundPopup && (
        <Popup bg="bg-transparent">
          <AudioPrompt
            setOpenSoundPopup={setOpenSoundPopup}
            setPermissionToStartSound={setPermissionToStartSound}
          />
        </Popup>
      )} */}

      {permissionToStartSound ? (
        // works fine just unable to play forst question due to autoplay policy have
        // have to use useref or in the complete project it will work fine
        <div className="hidden">
          <audio
            ref={audioRef}
            autoPlay={true}
            src={`data:audio/wav;base64,${allQuestions?.[currentIndex]?.audio}`}
            type="audio/mpeg"
          ></audio>
        </div>
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
    </div>
  );
}

export default Quiz;
