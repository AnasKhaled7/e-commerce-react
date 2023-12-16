import { useNavigate, NavLink } from "react-router-dom";
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
    title: "LinkedIn",
    icon: <LinkedIn />,
    link: "https://www.linkedin.com/in/anas-khaled-b756a7271/",
  },
  {
    title: "Email",
    icon: <EmailRounded />,
    link: "mailto:anas.elfayoumy7@gmail.com",
  },
];

const links = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Cart",
    to: "/cart",
  },
  {
    title: "My Account",
    to: "/profile",
  },
  {
    title: "Order Tracking",
    to: "/my-orders",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container
        maxWidth="xl"
        component="footer"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          py: 4,
        }}
      >
        {/* left */}
        <Stack flex={1} gap={2} minWidth={200} alignItems="start">
          {/* logo */}
          <Typography
            component="p"
            variant="h5"
            fontWeight={700}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Nile
          </Typography>
          {/* description */}
          <Typography variant="body2" fontWeight={300}>
            Nile is a fictional e-commerce website built with React, Redux, and
            Material-UI. Integrated with Node.js, Express, and MongoDB for the
            backend.
          </Typography>
          {/* social media */}
          <Stack direction="row" gap={0.5} alignItems="center">
            {icons.map((item) => (
              <IconButton
                key={item.title}
                size="small"
                aria-label={item.title}
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
          <Typography component="p" variant="h5" fontWeight={500}>
            Useful Links
          </Typography>
          {/* links */}
          <Stack gap={0.5} alignItems="start">
            {links.map((item) => (
              <Link
                key={item.title}
                component={NavLink}
                color="inherit"
                variant="body2"
                underline="hover"
                to={item.to}
              >
                {item.title}
              </Link>
            ))}
          </Stack>
        </Stack>

        {/* right */}
        <Stack flex={1} gap={2} minWidth={200}>
          {/* title */}
          <Typography component="p" variant="h5" fontWeight={500}>
            Contact
          </Typography>
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
