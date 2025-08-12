import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { minutesAndHoursSX } from "./styles/helpers";
import "./styles/time.css";

const selectStyles = { fontSize: "0.85em", fontWeight: "600" };

const hoursArr = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

const minutesArr = ["00", "10", "20", "30", "40", "50"];

export default function SelectTime() {
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");

  const handleHourChange = (event: SelectChangeEvent) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event: SelectChangeEvent) => {
    setHour(event.target.value);
  };

  useEffect(() => {
    const currentHour = new Date().getHours().toString().padStart(2, "0");
    setHour(currentHour);

    const currentMin = new Date().getMinutes();
    const roundedUp = Math.ceil(currentMin / 10) * 10;
    const nextMinute = roundedUp >= 60 ? "00" : roundedUp.toString().padStart(2, "0");
    setMin(nextMinute);
  }, []);

  return (
    <div className="select-hour-and-minute">
      <div className="select-hour">
        <FormControl variant={"standard"}>
          <Select
            disableUnderline={true}
            IconComponent={() => null}
            labelId="select-hour"
            id="select-hour"
            value={hour}
            onChange={handleHourChange}
            label="Age"
            MenuProps={{
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }}
            sx={minutesAndHoursSX}
          >
            {hoursArr.map((hour) => (
              <MenuItem sx={selectStyles} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="select-minute">
        <FormControl variant={"standard"}>
          <Select
            disableUnderline={true}
            IconComponent={() => null}
            labelId="select-min"
            id="select-min"
            value={min}
            onChange={handleMinuteChange}
            label="Age"
            MenuProps={{
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }}
            sx={minutesAndHoursSX}
          >
            {minutesArr.map((min) => (
              <MenuItem sx={selectStyles} value={min}>
                {min}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
