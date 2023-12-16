import { Divider, Typography } from "@mui/material";

const PageHeader = ({ text }) => {
  return (
    <>
      <Typography
        component="h2"
        variant="h4"
        fontWeight={700}
        textAlign="center"
      >
        {text}
      </Typography>

      <Divider />
    </>
  );
};
export default PageHeader;
