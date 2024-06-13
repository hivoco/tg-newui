import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AnimatedFirstPage from "./pages/AnimatedFirstPage";
import AnimatedSecondPage from "./pages/AnimatedSecondPage";
import AnimatedThirdPage from "./pages/AnimatedThirdPage";
import Home from "./pages/Home";
import Language from "./pages/Language";
import BackgroundMusic from "../src/utils/BackroundMusic";

function App() {
  const [isMusicAllowed, setIsMusicAllowed] = useState(false);
  const handleVisibilityChange = () => {
    setIsMusicAllowed(!document.hidden);
    
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <BrowserRouter>
      {isMusicAllowed && (
        <BackgroundMusic
          isMusicAllowed={isMusicAllowed}
          setIsMusicAllowed={setIsMusicAllowed}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Home setIsMusicAllowed={setIsMusicAllowed} />}
        />
        <Route path="/select-language" element={<Language />} />

        {/* <Route path="/login" element={<Login />} /> */}

        {/* <Route path="/quiz/play" element={<ProtectedRoute />}>
          <Route
            path=""
            element={
              <PlateformWiseQuiz setIsMusicAllowed={setIsMusicAllowed} />
            }
          />
        </Route> */}
        {/* <Route path="/quiz/play/finish" element={<ProtectedRoute />}>
          <Route path="" element={<Thanks />} />
        </Route>
        <Route path="/quiz/get-your-final-score" element={<ProtectedRoute />}>
          <Route path="" element={<FinalScore />} />
        </Route>
        <Route path="/result/access-your-leader" element={<ProtectedRoute />}>
          <Route path="" element={<LeaderBoard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
