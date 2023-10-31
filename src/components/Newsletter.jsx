import {
  Box,
  Button,
  Container,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
  return (
    <Box bgcolor="#fcf5f5" py={4}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* title */}
        <Typography component="h2" variant="h3" fontWeight={700}>
          Newsletter
        </Typography>

        {/* description */}
        <Typography variant="h6" fontWeight={300} textAlign="center">
          Get timely updates from your favorite products.
        </Typography>

        {/* input container */}
        <Stack
          component="form"
          direction="row"
          width="100%"
          maxWidth="600px"
          height={50}
        >
          {/* input */}
          <InputBase
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            inputProps={{ "aria-label": "search" }}
            sx={{
              flex: 8,
              backgroundColor: "#fff",
              padding: "0 10px",
              borderRadius: "4px 0 0 4px",
            }}
          />
          {/* button */}
          <Button
            type="submit"
            onClick={(e) => e.preventDefault()}
            variant="contained"
            sx={{ flex: 1, borderRadius: "0 4px 4px 0" }}
          >
            <SendIcon />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
export default Newsletter;
