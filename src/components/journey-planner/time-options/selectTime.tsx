import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export default function SelectTime() {
  const [day, setDay] = useState("Monday");

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="select-day">Day</InputLabel>
        <Select
        disableUnderline
          labelId="select-day"
          id="select-day"
          value={day}
          onChange={handleDayChange}
          label="Age"
          MenuProps={{
            anchorOrigin: {
              vertical: 'top', 
              horizontal: 'center',
            },
          }}
          sx={{
            width: "8rem",
            height: "2rem",
            backgroundColor: "rgb(180, 200, 208)",
            borderRadius:'0.4rem',
            color:"white",
            fontWeight:'800',
            paddingLeft:'0.4rem',
            textAlign:''
          }}
        >
          <MenuItem sx={{ fontSize: "0.9em", fontWeight:'700' }} value={"Monday"}>
            Monday
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.9em" }} value={"Tuesday"}>
            Tuesday
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.9em" }} value={"Wednesdat"}>
            Wednesday
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
