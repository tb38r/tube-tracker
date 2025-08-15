import { useState } from "react";
import SelectDayAndTime from "./selectDayAndTime";

export default function Departure() {
  const [nowOpacity, setNowOpacity] = useState(1);
  const [arriveOpacity, setArriveOpacity] = useState(0.5);
  const [leaveOpacity, setLeaveOpacity] = useState(0.5);

  const [showOptions, setShowOptions] = useState("none");
  const [isPinned, setIsPinned] = useState(false);
  const [isActive, setIsActive] = useState("Now");

  const handleHover = () => {
    if (isPinned) return;
    setShowOptions("flex");
  };

  const handleNoHover = (event: React.SyntheticEvent) => {
    event.stopPropagation();

    if (!isPinned) {
      setShowOptions("none");
    }
  };

  const setMode = (
    mode: "Arrive" | "Now" | "Leave",
    pinned: boolean,
    opacities: { arrive: number; now: number; leave: number }
  ) => {
    setIsPinned(pinned);
    setIsActive(mode);
    setArriveOpacity(opacities.arrive);
    setNowOpacity(opacities.now);
    setLeaveOpacity(opacities.leave);
  };

  const handleArrive = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setShowOptions("flex");
    setMode("Arrive", true, { arrive: 1, now: 0.5, leave: 0.5 });
  };

  const handleNow = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setMode("Now", false, { arrive: 0.5, now: 1, leave: 0.5 });
  };

  const handleLeave = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setMode("Leave", true, { arrive: 0.5, now: 0.5, leave: 1 });
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
          <span
            className="departure-gt"
            style={{ display: isPinned ? "none" : "block" }}
          >
            &gt;
          </span>
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
      {isActive !== "Now" && <SelectDayAndTime />}
    </div>
  );
}
