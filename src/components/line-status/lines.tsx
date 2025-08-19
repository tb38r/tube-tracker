import { useEffect, useState } from "react";
import { TubeLineColors, TubeLineNameMap } from "./types";
import { SeverityColorMap } from "./types";
import Line from "./line";

interface LineStatus {
  statusSeverity: number;
  statusSeverityDescription: string;
  reason?: string;
}

interface TubeData {
  id: string;
  name: string;
  modeName: string;
  lineStatuses: LineStatus[];
}

export default function Lines() {
  const [lines, setLines] = useState<TubeData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.tfl.gov.uk/Line/Mode/tube/Status"
        );
        if (!response.ok) {
          console.error("Error fetching line data", response);
          return;
        }
        const data = await response.json();
        setLines(data);
      } catch (err) {
        console.error("Lines fetch failed:", err);
      }
    })();
  }, []);


  return lines.map((line, i) => {
    const severity = line.lineStatuses[0].statusSeverity;
    const severityColor = SeverityColorMap[severity];
    const lineName = TubeLineNameMap[line.name];
    const lineColour = TubeLineColors[lineName];

    return (
      
      <span key={i}>
        <Line
          line={line?.name}
          status={line?.lineStatuses[0].statusSeverityDescription}
          statusColor={severityColor}
          color={lineColour}
        />
      </span>
    );
  });
}
