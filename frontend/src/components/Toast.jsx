import { Button, Snackbar } from "@mui/joy";
import { useState } from "react";

const Toast = ({
  msg,
  toast,
  setToast,
  color,
  icon,
  duration = 5000,
  ...props
}) => {
  return (
    <Snackbar
      open={toast}
      autoHideDuration={duration}
      color={color}
      variant="soft"
      startDecorator={icon}
      endDecorator={
        <Button
          onClick={() => setToast(false)}
          size="sm"
          variant="soft"
          color={color}
        >
          Dismiss
        </Button>
      }
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          setToast(false);
        }
      }}
      {...props}
    >
      {msg}
    </Snackbar>
  );
};

export default Toast;
