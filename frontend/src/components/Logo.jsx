import { Typography } from "@mui/joy";

const Logo = ({ level, styles, variant = "primary" }) => {
  const color = variant === "primary" ? "#814DDE" : "white";

  return (
    <Typography
      level={level}
      sx={{
        fontStyle: "italic",
        textAlign: "center",
        ...styles,
      }}
    >
      <span style={{ color: "black" }}>Line</span>
      <span style={{ color: color }}>Up</span>
    </Typography>
  );
};

export default Logo;
