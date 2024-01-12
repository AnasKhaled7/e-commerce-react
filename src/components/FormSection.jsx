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
        minHeight: { xs: "calc(100lvh - 56px)", sm: "calc(100lvh - 64px)" },
      }}
    >
      {children}
    </Container>
  );
};
export default FormSection;
