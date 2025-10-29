import Line from "./line";
import { SeverityColorMap, TubeLineColors, TubeLineNameMap } from "./types";

import useLineStatus from "../hooks/useLineStatus";

export default function Lines() {
  const [lines, error] = useLineStatus();

  if (error) {
    console.log("true");
  } else {
    console.log("false");
  }

  console.log(lines)

//handle error

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
