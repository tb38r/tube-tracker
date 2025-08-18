import { type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { daysSX, getNextFiveDays } from "./helpers";
import { JourneySelect } from "./journey-select";
import SelectTime from "./selectTime";
import "./styles/time.css";

interface DayAndTimeProps {
  handlePeriod: (type: string) => void;
  handleHour: (type: string) => void;
  handleMinute: (type: string) => void;
}

export default function SelectDayAndTime(props: DayAndTimeProps) {
  const [day, setDay] = useState<string>("");
  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const [isToday, setIsToday] = useState<boolean>(false);

  const { handlePeriod, handleHour, handleMinute } = props;

  const handleDayChange = (event: SelectChangeEvent) => {
    const period = event.target.value;
    setDay(period);
    handlePeriod(period);
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
      <SelectTime
        isToday={isToday}
        handleHour={handleHour}
        handleMinute={handleMinute}
      />
    </div>
  );
}
