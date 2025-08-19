import type {
  FavouriteKeys,
  createQueryArgs,
} from "../components/journey-planner/types/journey-types";

export const formatTime = (time: string) => {
  const date = new Date(time);
  const localTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localTime || time;
};

export const IsFavourite = (
  from: string | undefined,
  to: string | undefined,
  favourites: string | null
): boolean => {
  if (!from || !to || !favourites) return false;

  const favsToArr = JSON.parse(favourites);
  return favsToArr.some(
    (favItem: FavouriteKeys) => favItem.from === from && favItem.to === to
  );
};

export const getNextFiveDays = (locale = "en-UK") => {
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


export const createQueryString = ({
  fromDest,
  toDest,
  type,
  period,
  hour,
  minute,
}: createQueryArgs): string => {
 
  if (type === "Now" || !type) {
    const result = `${fromDest}/to/${toDest}?`;
    return result;
  }
  const days = getNextFiveDays()
  const selected = days.indexOf(period as string) || 0
  const date = getDateByOffset(selected)

  const time = `${hour}${minute}`

  const timeIs = type === "Arrive" ? "Arriving" : "Departing"

  const result =`${fromDest}/to/${toDest}?date=${date}&time=${time}&timeIs=${timeIs}&`

  return result;
};


const getDateYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const getDateByOffset = (daysOffset: number): string => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysOffset);
  return getDateYYYYMMDD(targetDate);
};