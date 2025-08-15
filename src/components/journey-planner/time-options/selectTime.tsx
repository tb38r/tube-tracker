import { type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  hoursArr,
  minutesAndHoursSX,
  minutesArr,
  tailHours,
  tailMins,
} from "./helpers";
import { JourneySelect } from "./journey-select";
import "./styles/time.css";

type isTodayProps = {
  isToday: boolean;
};

export default function SelectTime({ isToday }: isTodayProps) {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [hourOptions, setHourOptions] = useState(hoursArr);
  const [minOptions, setMinOptions] = useState(minutesArr);

  const currentHour = new Date().getHours().toString().padStart(2, "0");
  const currentMin = new Date().getMinutes();

  const roundedUp = Math.ceil(currentMin / 10) * 10;
  const nextMinute =
    roundedUp >= 60 ? "00" : roundedUp.toString().padStart(2, "0");

  const handleHourChange = (event: SelectChangeEvent) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event: SelectChangeEvent) => {
    setMin(event.target.value);
  };

  useEffect(() => {
    setHour(currentHour);
    setMin(nextMinute);
  }, []);

  useEffect(() => {
    if (!isToday) {
      setHourOptions(hoursArr);
      setMinOptions(minutesArr);
      return;
    }
  
    const newHours = tailHours(hoursArr, currentHour);
    const newMins = tailMins(minutesArr, currentMin);
  
    const isLate = currentMin > 50;
    const validHour = isLate ? newHours[1] : newHours[0];
    const validMins = validHour === currentHour ? newMins : minutesArr;
  
    setHourOptions(isLate ? newHours.slice(1) : newHours);
    setMinOptions(validMins);
    setHour(validHour);
    setMin(validMins[0]);
  }, [isToday]);
  

  return (
    <div className="select-hour-and-minute">
      <div className="select-hour">
        <JourneySelect
          id="hour"
          value={hour}
          label="hour-select"
          onChange={handleHourChange}
          options={hourOptions}
          sx={minutesAndHoursSX}
        />
      </div>

      <div className="select-minute">
        <JourneySelect
          id="min"
          value={min}
          label="min-select"
          onChange={handleMinuteChange}
          options={minOptions}
          sx={minutesAndHoursSX}
        />
      </div>
    </div>
  );
}
