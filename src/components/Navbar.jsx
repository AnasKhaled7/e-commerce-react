import { useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCartOutlined,
  Logout,
  PersonOutlineOutlined,
  ReceiptLongRounded,
} from "@mui/icons-material";

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

// navbar component
const Navbar = (props) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { decodedToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const links = [
    { name: "Profile", path: "/profile", icon: <PersonOutlineOutlined /> },
    { name: "My Orders", path: "/my-orders", icon: <ReceiptLongRounded /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography
        component="p"
        variant="h4"
        fontWeight={500}
        color="primary"
        sx={{ my: 2, textAlign: "center", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Nile
      </Typography>
      <Divider />
      <List>
        {decodedToken ? (
          <>
            {links.map((link) => (
              <ListItem
                key={link.name}
                disablePadding
                onClick={() => navigate(link.path)}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={link.name} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider />

            <ListItem disablePadding onClick={props.logoutHandler}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding onClick={() => navigate("/login")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Sign In" />
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
        <AppBar component="nav" color="inherit">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* left */}
            <Typography
              component="h1"
              variant="h4"
              fontWeight={500}
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Nile
            </Typography>

            {/* right */}
            <Stack gap={1} direction="row" alignItems="center">
              <Tooltip arrow title="Go to cart">
                <IconButton
                  color="inherit"
                  aria-label="go to cart"
                  onClick={() => navigate("/cart")}
                >
                  <Badge
                    badgeContent={cartItems.reduce(
                      (acc, currentValue) => acc + currentValue.quantity,
                      0
                    )}
                    color="primary"
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {decodedToken ? (
                  <Tooltip arrow title="Account">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="outlined" onClick={() => navigate("/login")}>
                    Sign In
                  </Button>
                )}
              </Box>

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

      {/* drop down menu */}
      {decodedToken && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {links.map((link) => (
            <MenuItem key={link.name} onClick={() => navigate(`${link.path}`)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              {link.name}
            </MenuItem>
          ))}

          <Divider />

          <MenuItem onClick={props.logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}

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
