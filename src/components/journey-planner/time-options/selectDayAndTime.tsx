import { type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { daysSX, getNextFiveDays } from "./helpers";
import { JourneySelect } from "./journey-select";
import SelectTime from "./selectTime";
import "./styles/time.css";

export default function SelectDayAndTime() {
  const [day, setDay] = useState<string>("");
  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const [isToday, setIsToday] = useState<boolean>(false);

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  useEffect(() => {
    const options = getNextFiveDays();
    setDayOptions(options);
    setDay(options[0]);
  }, []);

  useEffect(() => {
    day === "Today" ? setIsToday(true) : setIsToday(false);
  }, [day]);

  return (
    <div className="day-and-hours">
      <JourneySelect
        id="day"
        label="day-select"
        onChange={handleDayChange}
        options={dayOptions}
        sx={daysSX}
        value={day}
      />
      <SelectTime isToday = {isToday} />
    </div>
  );
}
