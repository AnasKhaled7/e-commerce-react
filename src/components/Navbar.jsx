import { useState } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  alpha,
  styled,
  useScrollTrigger,
} from "@mui/material";
import { Search, Menu, ShoppingCartOutlined } from "@mui/icons-material";

function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const drawerWidth = 240;

// search bar
const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));

const Navbar = (props) => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link
        component="button"
        variant="h4"
        underline="none"
        onClick={() => navigate("")}
        sx={{ my: 2 }}
      >
        Nile
      </Link>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/login")}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar component="nav">
          <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
            {/* left */}
            <Link
              component="button"
              variant="h4"
              underline="none"
              onClick={() => navigate("")}
              color="inherit"
            >
              Nile
            </Link>

            {/* center */}
            <SearchBox>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                id="search"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </SearchBox>

            {/* right */}
            <Stack gap={0.5} direction="row" alignItems="center">
              <Button
                color="inherit"
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>

              <IconButton
                color="inherit"
                aria-label="go to cart"
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={5} color="success">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* sidebar menu for mobile */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        anchor="right"
        onClose={handleDrawerToggle}
        // Better open performance on mobile.
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* to make the content come after the navbar, not beneath it */}
      <Toolbar />
    </>
  );
};
export default Navbar;
