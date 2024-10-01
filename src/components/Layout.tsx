import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../AuthContext";
import { Avatar, FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "../ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const drawerWidth = 240;

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigationList = [
    { title: "Dashboard", icon: <HomeIcon />, route: "/" },
    { title: "Devices", icon: <PhoneAndroidIcon />, route: "/devices" },
    {
      title: "Accessories",
      icon: <EarbudsIcon />,
      route: "/accessories",
    },
    { title: "Offers", icon: <LocalOfferIcon />, route: "/offers" },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <a href="#">
          <img
            src="/favicon.ico"
            alt=""
            style={{ width: 40, height: 40, padding: 4 }}
          />
        </a>
        <h1 className="text-lg p-1">
          <a href="/" className="text-[#1976d2]">
            iCompany CMS
          </a>
        </h1>
      </Toolbar>
      <Divider />
      <List>
        {navigationList.map(({ title, icon, route }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton onClick={() => navigate(route)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  const { isLoggedIn } = useAuth();
  const { mode, toggleTheme } = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="justify-between">
          <div className="page-title flex justify-center items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </div>
          {
            <div>
              <span>
                <FormControlLabel
                  control={
                    <Switch
                      className="!w-14"
                      checked={mode === "dark"}
                      onChange={toggleTheme}
                      name="themeToggle"
                      color="primary"
                    />
                  }
                  label={``}
                />
                {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
              </span>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  navigate("/profile");
                }}
                color="inherit"
              >
                {isLoggedIn ? (
                  <div className="flex justify-center items-center gap-2">
                    <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
                    <Typography variant="h6" noWrap>
                      Khaled
                    </Typography>
                  </div>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div className="flex flex-col justify-center !min-w-[calc(100dvw-300px)]">
        {children}
      </div>
    </Box>
  );
}
