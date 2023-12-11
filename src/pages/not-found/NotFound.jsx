import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
      }}
    >
      <Helmet>
        <title>404 | Nile</title>
      </Helmet>
      <Typography variant="h2" component="h2" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" component="h3" fontWeight={500}>
        Page not found
      </Typography>

      <Typography textAlign="center">
        Sorry, we couldn't find the page you're looking for.
      </Typography>

      <Button variant="outlined" size="large" onClick={() => navigate("")}>
        Go back
      </Button>
    </Container>
  );
};

export default NotFound;
