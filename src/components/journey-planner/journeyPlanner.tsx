import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import { Container, IconButton } from "@mui/material";
import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../search-bar/search";
import GoButton from "./goButton";
import { journeyPlannerInitialState, journeyReducer } from "./journeyReducer";
import Departure from "./time-options/departure";

export default function JourneyPlanner() {
  const [journeyPlannerState, dispatch] = useReducer(
    journeyReducer,
    journeyPlannerInitialState
  );

  const navigate = useNavigate();


  const handleFromDestination = (dest: string) => {
    dispatch({ type: "from", destination: dest });
  };

  const handleToDestination = (dest: string) => {
    dispatch({ type: "to", destination: dest });
  };

  const handleType = (dest: string) => {
    dispatch({ type: "type", destination: dest });
  };

  const handlePeriod = (dest: string) => {
    dispatch({ type: "period", destination: dest });
  };
  const handleHour = (dest: string) => {
    dispatch({ type: "hour", destination: dest });
  };

  const handleMinute = (dest: string) => {
    dispatch({ type: "minute", destination: dest });
  };

  const handleSubmit = () => {
    if (!journeyPlannerState.from || !journeyPlannerState.to) {
      return;
    }

    if (journeyPlannerState.from === journeyPlannerState.to) {
      dispatch({
        type: "error",
        destination: "Cannot navigate to & from the same destination",
      });
    } else {
      const { from, to, type, period, hour, minute } = journeyPlannerState;
      navigate(`/journey/${from}/${to}/${type}/${period}/${hour}/${minute}/`);
    }
  };

  const handleToggle = useCallback(() => {
    dispatch({ type: "from", destination: journeyPlannerState.to });
    dispatch({ type: "to", destination: journeyPlannerState.from });
  }, [journeyPlannerState.from, journeyPlannerState.to]);

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
        textAlign: "left",
        padding: "0.5rem",
      }}
    >
      <span style={{ color: "black", fontWeight: "500" }}>Journey Planner</span>

      <Search
        placeholder="Start"
        updateStation={handleFromDestination}
        value={journeyPlannerState.from}
      />
      <div className="destination-toggle-container">
        <IconButton>
          <SwapVertRoundedIcon
            fontSize="large"
            sx={{ color: "rgb(101, 118, 233)", cursor: "pointer" }}
            onClick={() => handleToggle()}
          />
        </IconButton>
      </div>

      <Search
        placeholder="End"
        updateStation={handleToDestination}
        value={journeyPlannerState.to}
      />
      {journeyPlannerState.error && (
        <span
          style={{
            backgroundColor: "rgb(235 44 44)",
            display: "flex",
            justifyContent: "center",
            fontWeight: "500",
            margin: "0.25rem",
            borderRadius: "0.3rem",
          }}
          className="journey-error"
        >
          <span>&#9888;&nbsp;</span> {journeyPlannerState.errorMsg}
        </span>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.3rem",
        }}
      >
        <Departure
          handleType={handleType}
          handlePeriod={handlePeriod}
          handleHour={handleHour}
          handleMinute={handleMinute}
        />
        <div className="go-button-container" onClick={() => handleSubmit()}>
          <GoButton />
        </div>
      </div>
    </Container>
  );
}
