import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./components/home/home";
import DisplayArrivals from "./components/arrivals/displayArrivals";
import DisplayJourney from "./components/journey-planner/displayJourney";
import FourZeroFour from "./components/404-page/404";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/arrivals/:tubestop" element={<DisplayArrivals />} />
        <Route path="/journey/:from/:to/:type?/:period?/:hour?/:minute?" element={<DisplayJourney />} />
        <Route path="*" element={<FourZeroFour/>} />
      </Route>
    </Routes>
  );
}

export default App;
