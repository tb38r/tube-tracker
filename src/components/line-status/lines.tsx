import Line from "./line";
import { SeverityColorMap, TubeLineColors, TubeLineNameMap } from "./types";

import { useCallback, useEffect, useMemo, useState } from "react";
import useLineStatus from "../hooks/useLineStatus";
import ErrorMessage from "./errorDescription";

export default function Lines() {
  const [lines, error] = useLineStatus();
  const [selectedLine, setSelectedLine] = useState("");
  const [errorMessage, setErrorMessage] = useState<{
    status: string;
    description: string;
    color: string;
  } | null>(null);

  const handleSelectedLine = useCallback((line: string, severity: number) => {
    if (severity === 10) {
      return;
    }
    setSelectedLine(line);
  }, []);

  const handleShowLines = useCallback(()=>{
    setSelectedLine('')

  },[])

  useEffect(() => {
    const selected = lines.find((line) => line.name === selectedLine);

    if (selected) {
      const status = selected.lineStatuses[0]?.statusSeverityDescription || "";
      const description =
        selected.lineStatuses[0]?.disruption?.description || "";
      const color = TubeLineColors[TubeLineNameMap[selected.name]];
      setErrorMessage({ status, description, color });
    } else {
      setErrorMessage(null);
    }
  }, [selectedLine, lines]);

  const linesComponent = useMemo(() => {
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
            handleSelectedLine={handleSelectedLine}
            severity={severity}
          />
        </span>
      );
    });
  }, [lines]);

  //to do : handle error
  if (error) {
    //add error component
    return;
  }

  return selectedLine ? (
    <ErrorMessage
      status={errorMessage?.status as string}
      description={errorMessage?.description as string}
      color={errorMessage?.color as string}
      showLines = {handleShowLines}

    />
  ) : (
    linesComponent
  );
}
