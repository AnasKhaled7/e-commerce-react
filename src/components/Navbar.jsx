import { useContext, useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { UserContext } from "../context/UserProvider";

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
const Search = styled("div")(({ theme }) => ({
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
  const { userToken } = useContext(UserContext);
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
        {userToken ? (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding onClick={() => navigate("/register")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate("/login")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id="search"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {/* right */}
            <Stack direction="row" alignItems="center">
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {userToken ? (
                  <Button color="inherit">Logout</Button>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                  </>
                )}
              </Box>
              <IconButton
                color="inherit"
                aria-label="go to cart"
                onClick={() => navigate("/cart")}
              >
                <Badge badgeContent={5} color="success">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
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
