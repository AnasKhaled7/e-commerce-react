import { Container } from "@mui/material";

const PageSection = ({ children }) => {
  return (
    <Container
      component="section"
      maxWidth="xl"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
      }}
    >
      {children}
    </Container>
  );
};

export default PageSection;
