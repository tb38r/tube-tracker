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
    console.log("curr", currentMin);
    if (isToday) {
      const newHoursOptions = tailHours(hoursArr, currentHour);
      currentMin > 50 ? setHourOptions(newHoursOptions.slice(1)): setHourOptions(newHoursOptions);

      if (hour === currentHour) {
        const newMinOptions = tailMins(minutesArr, currentMin);
        currentMin > 50 ? setMinOptions(minutesArr):setMinOptions(newMinOptions);
      } else {
        setMinOptions(minutesArr);
      }
    } else {
      setHourOptions(hoursArr);
      setMinOptions(minutesArr);
    }
  }, [isToday, hour]);

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
