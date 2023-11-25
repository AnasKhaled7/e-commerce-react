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
  Link,
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
  useScrollTrigger,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCartOutlined,
  Logout,
  PersonOutlineOutlined,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";

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
  const { token, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

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
        {token ? (
          <>
            <ListItem disablePadding onClick={() => navigate("/profile")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate("/my-orders")}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="My Orders" />
              </ListItemButton>
            </ListItem>
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

            {/* right */}
            <Stack gap={0.5} direction="row" alignItems="center">
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
                  color="success"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {userInfo ? (
                  <Tooltip title="Account">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: deepPurple[400] }}
                      >
                        {userInfo?.firstName[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button color="inherit" onClick={() => navigate("/login")}>
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
      {userInfo && (
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
          <MenuItem onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <PersonOutlineOutlined />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/my-orders")}>
            <ListItemIcon>
              <ReceiptLongRounded />
            </ListItemIcon>
            My Orders
          </MenuItem>

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
