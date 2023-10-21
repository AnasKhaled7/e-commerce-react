import { CircularProgress, Stack } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <CircularProgress size="3.5rem" />
    </Stack>
  );
};

export default LoadingScreen;
