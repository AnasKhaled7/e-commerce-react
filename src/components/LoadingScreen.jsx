import { CircularProgress, Stack } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
      }}
    >
      <CircularProgress size="3.5rem" />
    </Stack>
  );
};

export default LoadingScreen;
