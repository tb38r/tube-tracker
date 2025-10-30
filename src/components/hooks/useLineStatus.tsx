import { useEffect, useState } from "react";
import { type TubeData } from "../line-status/types";

export default function useLineStatus(): [
  lines: TubeData[],
  error: Response | null
] {
  const [lines, setLines] = useState<TubeData[]>([]);
  const [error, setError] = useState<Response | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.tfl.gov.uk/Line/Mode/tube/Status"
        );
        if (!response.ok) {
          console.error("Error fetching line data", response);
          setError(response);
          return;
        }
        const data = await response.json();
        setLines(data);
      } catch (err) {
        console.error("Lines fetch failed:", err);
      }
    })();
  }, []);


  return [lines, error];
}
