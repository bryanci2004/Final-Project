import { HashRouter, Route, Routes } from "react-router-dom";
import BasicQuestions from "./Basic Questions/BasicQuestions";
import DetailedQuestions from "./Detailed Questions/DetailedQuestions";
import HomePage from "./Home Page/HomePage";
import App from "./App";

function Routing(){
    return(
        <>
      <HashRouter>
        <Routes>
          <Route path="/BasicQuestions" element={<BasicQuestions />} />
          <Route path="/DetailedQuestions" element={<DetailedQuestions />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/App" element={<App />} />
        </Routes>
      </HashRouter>
      </>
    )
}

export default Routing;