import { Button } from "@mui/material";

type LineErrorProps = {
  status: string;
  description: string;
  color: string;
  showLines: () => void;
};

export default function ErrorMessage(props: LineErrorProps) {
  const { status, description, color, showLines } = props;

  return (
    <div style={{ color: "black", padding: "1rem", height: "90%" }}>
      <div
        style={{
          backgroundColor: color,
          color: "white",
          padding: "1.5rem",
          borderRadius: "7px",
          fontSize: "1rem",
          fontWeight: "500",
        }}
      >
        {description}
        <span></span>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            height: "1.7rem",
            marginTop: "8px",
          }}
        >
          <Button variant="contained" onClick={showLines}>
            {" "}
            all lines
          </Button>
        </div>
      </div>
    </div>
  );
}
