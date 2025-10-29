type LineErrorProps = {
  status: string;
  description: string;
};

export default function ErrorMessage(props: LineErrorProps) {
  const { status, description } = props;

  return (
    <div style={{color: "black", padding:'1rem'}}>
      {status} <br />
      {description}
    </div>
  );
}
