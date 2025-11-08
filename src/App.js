import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchInput from "./pages/MatchInput";
import MatchStats from "./pages/MatchStats";
import TeamBalancer from "./pages/TeamBalancer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<MatchInput />} />
        <Route path="/stats" element={<MatchStats />} />
        <Route path="/balance" element={<TeamBalancer />} />
      </Routes>
    </Router>
  );
}
