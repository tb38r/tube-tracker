import { useState } from "react";
import SelectDayAndTime from "./selectDayAndTime";

export default function Departure() {
  const [nowOpacity, setNowOpacity] = useState(1);
  const [arriveOpacity, setArriveOpacity] = useState(0.5);
  const [leaveOpacity, setLeaveOpacity] = useState(0.5);

  const [showOptions, setShowOptions] = useState("none");
  const [isPinned, setIsPinned] = useState(false);
  const [isActive, setIsActive] = useState("Now")

  const handleHover = () => {
    if(isPinned)return
    setShowOptions("flex");
  };

  const handleNoHover = (event: React.SyntheticEvent) => {
    event.stopPropagation();

    if (!isPinned) {
      setShowOptions("none");
    }
  };

  const handleArrive = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsPinned(true);
    setIsActive("Arrive")
    setShowOptions("flex");
    setArriveOpacity(1);
    setNowOpacity(0.5);
    setLeaveOpacity(0.5);
  };

  const handleNow = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsPinned(false);
    setIsActive("Now")
    setNowOpacity(1)
    setLeaveOpacity(0.5);    
    setArriveOpacity(0.5);

  };

  const handleLeave = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsPinned(true);
    setIsActive("Leave")
    setLeaveOpacity(1);    
    setNowOpacity(0.5);
    setArriveOpacity(0.5);

  };

  return (
    <div className="time-options">
    <div
      className="departure-ctn"
      onMouseEnter={handleHover}
      onMouseLeave={handleNoHover}
    >
      <div
        className="departure-now"
        style={{
          color: `rgba(25, 118, 210, ${nowOpacity})`,
        }}
      >
        <span onClick={handleNow}>Now</span>
        <span className="departure-gt" style={{display:isPinned? 'none':'block'}}>&gt;</span>
      </div>
      <div
        className="departure-options"
        style={{
          display: showOptions,
        }}
      >
        <div
          className="departure-arrive"
          style={{ color: `rgba(25, 118, 210, ${arriveOpacity})` }}
          onClick={handleArrive}
        >
          Arrive
        </div>
        <div
          className="departure-leave"
          style={{ color: `rgba(25, 118, 210, ${leaveOpacity})` }}
          onClick={handleLeave}

       >
          Leave
        </div>
      </div>
    </div>
    <SelectDayAndTime/>
    </div>
  );
}
