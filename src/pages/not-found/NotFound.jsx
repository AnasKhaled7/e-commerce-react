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
        minHeight: { xs: "calc(100svh - 56px)", sm: "calc(100svh - 64px)" },
      }}
    >
      <Helmet>
        <title>404 | Nile</title>
      </Helmet>
      <Typography variant="h2" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" component="p" fontWeight={500}>
        Page Not Found
      </Typography>

      <Typography textAlign="center">
        Sorry, we couldn't find the page you're looking for.
      </Typography>

      <Button variant="outlined" size="large" onClick={() => navigate("/")}>
        Go back home
      </Button>
    </Container>
  );
};

export default NotFound;
