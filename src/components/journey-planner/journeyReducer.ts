import { StopPoints } from "../search-bar/stop-points/stops";
import { type Action, type State } from "./types/journey-types";

export const journeyPlannerInitialState: State = {
  from: "",
  to: "",
  error: false,
  errorMsg: "",
  type: "",
  period: "",
  hour: "",
  minute: "",
};

export function journeyReducer(state: State, action: Action): State {
  // if (!(action.destination in StopPoints) && action.type !== "error") {
  //   return {
  //     ...state,
  //     error: true,
  //     errorMsg: `${action.destination}`,
  //   };
  // }

  switch (action.type) {
    case "error":
      return { ...state, error: true, errorMsg: action.destination };
    case "from":
      return { ...state, from: action.destination, error: false, errorMsg: "" };
    case "to":
      return { ...state, to: action.destination, error: false, errorMsg: "" };
    case "type":
      return { ...state, type: action.destination, error: false, errorMsg: "" };
    case "period":
      return { ...state, period: action.destination, error: false, errorMsg: "" };
    case "hour":
      return { ...state, hour: action.destination, error: false, errorMsg: "" };
    case "minute":
      return { ...state, minute: action.destination, error: false, errorMsg: "" };
    default:
      return state;
  }
}
