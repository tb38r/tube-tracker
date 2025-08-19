import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { LinearProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createQueryString,
  IsFavourite,
  formatTime,
} from "../../utils/helpers";
import { useLocaLStore, type JourneyObject } from "../hooks/useLocalStore";
import "./styles/journey-planner.css";
import { LightTooltip } from "./styles/styles";
import type { JourneyResult } from "./types/journey-types";
import { UndergroundStations } from "./types/undergroundStops";

export default function DisplayJourney() {
  const [isInValid, setIsInValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<JourneyResult>();
  const [journies, saveJourney, removeJourney] = useLocaLStore();

  const { from, to, type, period, hour, minute } = useParams();
  console.log(from, to, type, period, hour, minute);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setData(undefined);

    if (
      from &&
      from in UndergroundStations &&
      to &&
      to in UndergroundStations
    ) {
      setError(false);
      setIsInValid(false);
      setLoading(true);
    } else {
      setIsInValid(true);
      setLoading(false);
      setError(true);
      setErrorMsg(`Unable to route from ${from} to ${to}`);
    }
  }, [from, to]);

  const queryString = useMemo(() => {
    const fromDest =
      UndergroundStations[from as keyof typeof UndergroundStations];
    const toDest = UndergroundStations[to as keyof typeof UndergroundStations];
    console.log('type', type)
    return createQueryString({ fromDest, toDest, type, period, hour, minute });
  }, [from, to, type, period, hour, minute]);

  useEffect(() => {
    if (isInValid) return;
    setLoading(true);

    (async () => {
      try {
        const response = await fetch(
          `https://api.tfl.gov.uk/journey/journeyresults/${queryString}app_key=${apiKey}&mode=tube`
        );

        if (!response.ok) {
          setLoading(false);
          setError(true);
          setErrorMsg(`Unable to retrieve data for ${from} to ${to}`);
          return;
        }

        const data = await response.json();

        setData(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        let message = `An unexpected error occurred`;
        if (err instanceof Error) {
          message = `Unable to retrieve data for ${from} to ${to} \n ${err.message}`;
        }
        setErrorMsg(message);
        console.error("Failed to retrieve journey:", err);
      }
    })();
  }, [isInValid, from, to, apiKey, queryString]);

  const handleFavourite = useCallback(() => {
    if (IsFavourite(from, to, journies) && from && to) {
      removeJourney(from, to);
      return;
    }
    let id = Math.random().toString(36).substring(2, 6);

    const journeyToSave: JourneyObject = {
      [`from`]: `${from}`,
      [`to`]: `${to}`,
      [`id`]: id,
    };
    saveJourney(journeyToSave);
  }, [from, to, journies, saveJourney, removeJourney]);

  return (
    <>
      <div className="display-journeys">
        {loading && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {
              <span style={{ color: "black" }}>
                Getting your routes from {from} to {to}
              </span>
            }
            <br />
            <span></span>
            <LinearProgress
              color="secondary"
              sx={{ width: "100%", display: "block" }}
            />
          </div>
        )}
        {error && <div style={{ color: "red" }}>Error: {errorMsg}</div>}

        <>
          {!loading && !error && data && (
            <div className="title-container">
              <div className="journey-title">Journey results</div>
              <div className="journey-subtitle">
                {from?.replace(" Underground Station", "") || from} {"to"}{" "}
                {to?.replace(" Underground Station", "") || to}
                <span
                  onClick={() => handleFavourite()}
                  style={{ cursor: "pointer" }}
                >
                  <LightTooltip
                    title={
                      IsFavourite(from, to, journies)
                        ? "Unmark Favourite"
                        : "Save to Favourites"
                    }
                    placement="left"
                    style={{ color: "red" }}
                  >
                    {IsFavourite(from, to, journies) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </LightTooltip>
                </span>
              </div>
            </div>
          )}
          {!loading &&
            !error &&
            data &&
            data?.journeys?.map((journey, index) => (
              <div key={index} className="journey-leg-card">
                <>
                  {journey.legs.map((leg, index) => (
                    <div key={index} className="leg-row-item">
                      <span>{leg.instruction.summary} </span>
                      <span className="leg-item-duration">
                        {" "}
                        {formatTime(leg.departureTime)}
                      </span>
                    </div>
                  ))}
                </>
                <div className="leg-row-item">
                  <span>Travel Time</span>
                  <span className="leg-item-duration">
                    {" "}
                    {journey.duration}mins
                  </span>
                </div>
              </div>
            ))}
        </>
      </div>
    </>
  );
}
