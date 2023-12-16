import { useState, useMemo } from "react";
import { Alert, Slide, Snackbar } from "@mui/material";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (msg, color) => {
    setSeverity(color);
    setMessage(msg);
    setOpen(true);
  };

  const hideSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const TransitionUp = (props) => <Slide {...props} direction="up" />;

  const SnackbarComponent = useMemo(
    () => (
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={hideSnackbar}
        TransitionComponent={TransitionUp}
      >
        <Alert
          onClose={hideSnackbar}
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    ),
    [open, message, severity]
  );

  return [showSnackbar, hideSnackbar, SnackbarComponent];
};
