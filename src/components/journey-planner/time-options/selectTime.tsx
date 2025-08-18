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

interface TimeProps {
  isToday: boolean;
  handleHour: (type: string) => void;
  handleMinute: (type: string) => void;
}

export default function SelectTime(props: TimeProps) {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [hourOptions, setHourOptions] = useState(hoursArr);
  const [minOptions, setMinOptions] = useState(minutesArr);

  const { isToday, handleHour, handleMinute } = props;

  const currentHour = new Date().getHours().toString().padStart(2, "0");
  const currentMin = new Date().getMinutes();

  const handleHourChange = (event: SelectChangeEvent) => {
    const hour = event.target.value;
    setHour(hour);
    handleHour(hour);
  };

  const handleMinuteChange = (event: SelectChangeEvent) => {
    const minute = event.target.value;
    setMin(minute);
    handleMinute(minute);
  };

  useEffect(() => {
    if (!isToday) {
      setHourOptions(hoursArr);
      setMinOptions(minutesArr);
      return;
    }

    const newHours = tailHours(hoursArr, currentHour);
    const isLate = currentMin > 50;
    const hoursOpts = isLate ? newHours.slice(1) : newHours;

    if (!hoursOpts.length) {
      setHourOptions([]);
      setMinOptions([]);
      setHour("");
      setMin("");
      return;
    }

    setHourOptions(hoursOpts);

    const nextHour = hoursOpts.includes(hour) ? hour : hoursOpts[0];

    const minsForHour =
      nextHour === currentHour ? tailMins(minutesArr, currentMin) : minutesArr;

    setMinOptions(minsForHour);

    const nextMin = minsForHour.includes(min) ? min : minsForHour[0];

    if (nextHour !== hour) setHour(nextHour);
    if (nextMin !== min) setMin(nextMin);
  }, [isToday, currentHour, currentMin, hour, min]);

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
