import { useState } from "react";

export default function Departure() {
  // const [opacity, setOpacity] = useState(0.5);
  const [nowOpacity, setNowOpacity] = useState(1);
  const [arriveOpacity, setArriveOpacity] = useState(0.5);
  const [leaveOpacity, setLeaveOpacity] = useState(0.5);

  const [showOptions, setShowOptions] = useState("none");
  const [isPinned, setIsPinned] = useState(false);

  const handleHover = () => {
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
    setShowOptions("flex");
    setArriveOpacity(1);
    setNowOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));
    setLeaveOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));
  };

  const handleNow = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsPinned(false);
    setNowOpacity((opacity) => (opacity === 1 ? opacity : 1));
    setLeaveOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));    setLeaveOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));
    setArriveOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));

  };

  const handleLeave = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsPinned(false);
    setLeaveOpacity(1);    
    setNowOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));
    setArriveOpacity((opacity) => (opacity === 0.5 ? opacity : 0.5));

  };

  return (
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
        <span className="departure-gt">&gt;</span>
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
  );
}
