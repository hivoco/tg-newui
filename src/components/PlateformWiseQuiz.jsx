import { useSearchParams } from "react-router-dom";
import RecorderQuiz from "./RecorderQuiz";
import Quiz from "./Quiz";

const PlateformWiseQuiz = ({ setIsMusicAllowed }) => {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");
  return (
    <div>
      {platform == "iOS" ? (
        <RecorderQuiz
          setIsMusicAllowed={setIsMusicAllowed}
          platform={platform}
        />
      ) : (
        <Quiz setIsMusicAllowed={setIsMusicAllowed} platform={platform} />
      )}
    </div>
  );
};

export default PlateformWiseQuiz;
