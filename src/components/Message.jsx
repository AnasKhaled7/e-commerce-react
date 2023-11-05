import { Alert, Container } from "@mui/material";

const Message = ({ severity, children }) => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Alert variant="filled" severity={severity}>
        {children}
      </Alert>
    </Container>
  );
};

Message.defaultProps = {
  severity: "info",
};

export default Message;
