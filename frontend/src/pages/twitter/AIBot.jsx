import { Box, Typography } from "@mui/joy";
import React from "react";

const AIBot = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          AI-Bot
        </Typography>
      </Box>
      <div>AIBot</div>
    </>
  );
};

export default AIBot;
