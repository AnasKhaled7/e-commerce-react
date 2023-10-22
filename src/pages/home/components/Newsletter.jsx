import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
        <Typography component="p" variant="h6" fontWeight={300}>
          Get timely updates from your favorite products.
        </Typography>

        {/* input container */}
        <Stack
          component="form"
          direction="row"
          width="50%"
          minWidth={200}
          height={50}
        >
          {/* input */}
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your email"
            style={{
              border: "none",
              borderRadius: "4px 0 0 4px",
              flex: 8,
              padding: "0 10px",
              outline: "none",
              fontSize: 15,
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
