const getNextFiveDays = (locale = "en-UK") => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayName = date.toLocaleDateString(locale, { weekday: "long" });

    if (i === 0) {
      days.push("Today");
    } else if (i === 1) {
      days.push("Tomorrow");
    } else {
      days.push(dayName);
    }
  }

  return days;
};

function tailHours<T>(arr: T[], start: T): T[] {
  const i = arr.indexOf(start);
  return i === -1 ? [] : arr.slice(i);
}

function tailMins(arr: string[], num: number): string[] {
  const idx = arr.findIndex(v => Number(v) >= num);
  return idx === -1 ? [] : arr.slice(idx);
}


const sxProps = {
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
};

const minutesAndHoursSX = {
  width: "3rem",
  ...sxProps,
};

const daysSX = {
  width: "6.5rem",
  "& .MuiSelect-select": {
    overflow: "visible",
  },
  ...sxProps,
};

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
];

const minutesArr = ["00", "10", "20", "30", "40", "50"];

export {
  daysSX,
  getNextFiveDays,
  hoursArr,
  minutesAndHoursSX,
  minutesArr,
  selectStyles,
  tailHours,
  tailMins
};
