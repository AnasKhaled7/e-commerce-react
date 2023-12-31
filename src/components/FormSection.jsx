import Container from "@mui/material/Container";

const FormSection = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        minHeight: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
      }}
    >
      {children}
    </Container>
  );
};
export default FormSection;
