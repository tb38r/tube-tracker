import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import SelectTime from "./selectTime";
import './styles/time.css'
const selectStyles = { fontSize: "0.85em", fontWeight: "600" };

export default function SelectDay() {
  const [day, setDay] = useState("Monday");

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  return (
    <div className="day-and-hours">
      <FormControl variant={"standard"}>
        <Select
          disableUnderline={true}
          IconComponent={() => null}

          labelId="select-day"
          id="select-day"
          value={day}
          onChange={handleDayChange}
          label="Age"
          MenuProps={{
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }}
          sx={{
            width: "6.5rem",
            '& .MuiSelect-select': {
             
              overflow:'visible'
            },
            height: "1.8rem",
            backgroundColor: "rgb(180, 200, 208)",
            borderRadius: "0.4rem",
            color: "white",
            fontWeight: "800",
            paddingLeft: "0.3rem",
            alignContent: "center",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem sx={selectStyles} value={"Monday"}>
            Monday
          </MenuItem>
          <MenuItem sx={selectStyles} value={"Tuesday"}>
            Tuesday
          </MenuItem>
          <MenuItem sx={selectStyles} value={"Wednesdat"}>
            Wednesday
          </MenuItem>
        </Select>
      </FormControl>

      <SelectTime />
    </div>
  );
}
