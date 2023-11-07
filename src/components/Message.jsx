import Alert from "@mui/material/Alert";

const Message = ({ severity, children }) => {
  return (
    <Alert
      severity={severity}
      sx={{ width: "100%", maxWidth: "600px", mx: "auto", my: 2 }}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  severity: "info",
};

export default Message;
