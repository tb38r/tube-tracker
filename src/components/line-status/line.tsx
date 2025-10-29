import { Paper, styled } from "@mui/material";
import Dot from "./dot";

export default function Line(props: any) {
  const { line, status, color, statusColor, handleSelectedLine } = props;
  const WrappedPaper = styled(Paper)(() => ({})) as typeof Paper;

  return (
    <WrappedPaper
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "2rem",
        alignItems: "center",
        color: "black",
        borderRadius: "0.5em",
        borderLeft: `0.3rem solid ${color}`,
        paddingX: "10px",
        backgroundColor: "#E1EBEE",
      }}
      onClick={()=>handleSelectedLine(line)}
      elevation={0}
    >
      <span style={{ fontWeight: "600" }} className="line-name">
        {line}
      </span>
      <Dot status={status} color={statusColor} />
    </WrappedPaper>
  );
}
