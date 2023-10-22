import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const icons = [
  {
    icon: <LinkedInIcon />,
  },
  {
    icon: <EmailRoundedIcon />,
  },
  {
    icon: <WhatsAppIcon />,
  },
  {
    icon: <FacebookIcon />,
  },
  {
    icon: <InstagramIcon />,
  },
  {
    icon: <YouTubeIcon />,
  },
];

const links = [
  {
    title: "Home",
  },
  {
    title: "Cart",
  },
  {
    title: "Man Fashion",
  },
  {
    title: "Woman Fashion",
  },
  {
    title: "Accessories",
  },
  {
    title: "My Account",
  },
  {
    title: "Order Tracking",
  },
  {
    title: "Wishlist",
  },
  {
    title: "Terms",
  },
];

const Footer = () => {
  return (
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
      <Stack flex={1} gap={2} minWidth={200}>
        {/* logo */}
        <Typography component="h1" variant="h4" fontWeight={500}>
          Nile
        </Typography>
        {/* description */}
        <Typography variant="body1" fontWeight={300}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          voluptates, voluptatum, dolorum, quidem quos quas similique voluptatem
          quae voluptatum quidem quos quas similique voluptatem quae voluptatum
        </Typography>
        {/* social media */}
        <Stack direction="row" gap={0.5} alignItems="center">
          {icons.map((item, index) => (
            <IconButton size="small" key={index}>
              {item.icon}
            </IconButton>
          ))}
        </Stack>
      </Stack>

      {/* center */}
      <Stack flex={1} gap={2} minWidth={200}>
        {/* title */}
        <Typography variant="h5" fontWeight={500}>
          Useful Links
        </Typography>
        {/* links */}
        <Stack gap={0.5}>
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
        <Typography variant="h5" fontWeight={500}>
          Contact
        </Typography>
        {/* links */}
        <Stack gap={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <FmdGoodRoundedIcon />
            <Typography variant="body1" fontWeight={300}>
              123 Fake Street
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <LocalPhoneRoundedIcon />
            <Typography variant="body1" fontWeight={300}>
              +123 456 7890
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <EmailRoundedIcon />
            <Typography variant="body1" fontWeight={300}>
              contact@nile.com
            </Typography>
          </Stack>
          {/* payment */}
          <Box>
            <img
              src="https://i.ibb.co/Qfvn4z6/payment.png"
              alt="payment"
              width="50%"
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Footer;
