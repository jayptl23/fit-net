import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";
import { blue } from "@mui/material/colors";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const drawerWidth = 220;

function Sidebar() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = useUserStore((state) => state.logout);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f1f5f9",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        sx={{ textAlign: "center", paddingY: 2, fontWeight: 700 }}
        variant="h4"
        component="h1"
      >
        Fit <span style={{ color: blue[700] }}>Net</span>
      </Typography>

      <Divider />

      <List
        sx={{
          "& .MuiListItemButton-root:hover": {
            bgcolor: blue[100],
            "&, & .MuiListItemIcon-root": {
              color: "blue[100]",
            },
          },
        }}
      >
        <ListItem key={"studios"} disablePadding>
          <ListItemButton component={Link} to={"/studios"}>
            <ListItemIcon>
              <ViewListRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Studios"} />
          </ListItemButton>
        </ListItem>

        {isLoggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/classes">
                <ListItemIcon>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="My Classes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>

      {!isLoggedIn && (
        <List>
          <ListItem key={"login"} disablePadding>
            <ListItemButton component={Link} to={"/login"}>
              <ListItemIcon>
                <LoginRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"register"} disablePadding>
            <ListItemButton component={Link} to={"/register"}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
}

export default Sidebar;
