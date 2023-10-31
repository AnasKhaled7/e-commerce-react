import { useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { EmailRounded, FmdGoodRounded, LinkedIn } from "@mui/icons-material";

const icons = [
  {
    icon: <LinkedIn />,
    link: "https://www.linkedin.com/in/anas-khaled-b756a7271/",
  },
  {
    icon: <EmailRounded />,
    link: "mailto:anas.elfayoumy7@gmail.com",
  },
];

const links = [
  {
    title: "Home",
  },
  {
    title: "My Account",
  },
  {
    title: "Wishlist",
  },
  {
    title: "Cart",
  },
  {
    title: "Order Tracking",
  },
  {
    title: "Terms",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          my: 4,
        }}
      >
        {/* left */}
        <Stack flex={1} gap={2} minWidth={200} alignItems="start">
          {/* logo */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("")}
          >
            Nile
          </Typography>
          {/* description */}
          <Typography variant="body2" fontWeight={300}>
            This is a demo website for Nile, an e-commerce platform.
          </Typography>
          {/* social media */}
          <Stack direction="row" gap={0.5} alignItems="center">
            {icons.map((item, index) => (
              <IconButton
                key={index}
                size="small"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        {/* center */}
        <Stack flex={1} gap={2} minWidth={200}>
          {/* title */}
          <Typography variant="h5">Useful Links</Typography>
          {/* links */}
          <Stack gap={0.5} alignItems="start">
            {links.map((item, index) => (
              <Link
                key={index}
                color="inherit"
                variant="body2"
                underline="hover"
                href="#"
              >
                {item.title}
              </Link>
            ))}
          </Stack>
        </Stack>

        {/* right */}
        <Stack flex={1} gap={2} minWidth={200}>
          {/* title */}
          <Typography variant="h5">Contact</Typography>
          {/* links */}
          <Stack gap={2}>
            <Stack direction="row" alignItems="center" gap={1}>
              <FmdGoodRounded />
              <Typography variant="body2" fontWeight={300}>
                Cairo, Egypt
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <EmailRounded />
              <Typography variant="body2" fontWeight={300}>
                anas.elfayoumy7@gmail.com
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Divider />

      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography variant="body2" fontWeight={300} textAlign="center">
          © {currentYear} Nile. All rights reserved.
        </Typography>
      </Container>
    </>
  );
};
export default Footer;
