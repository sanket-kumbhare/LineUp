import { useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  X as XIcon,
  Instagram as InstaIcon,
  CalendarMonth,
} from "@mui/icons-material";
import { Logo } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../api/auth";
import { authLogout } from "../features/auth/authSlice";

// import ColorSchemeToggle from "./ColorSchemeToggle";
// import { closeSidebar } from "../utils";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    let response = auth.logoutAccount();
    if (response) {
      dispatch(authLogout());
      navigate("/login");
    }
  };
  const navItems = [
    {
      name: "Calendar",
      icon: <CalendarMonth />,
      slug: "/",
      active: true,
    },
    {
      name: "Twitter",
      icon: <XIcon />,
      childrens: [
        {
          name: "Scheduler",
          slug: "/twitter/scheduler",
          active: true,
        },
        {
          name: "AI-Bot",
          slug: "/twitter/ai-bot",
          active: true,
        },
      ],
    },
    {
      name: "Instagram",
      icon: <InstaIcon />,
      childrens: [
        {
          name: "Coming Soon",
          slug: "/instagram",
          active: false,
        },
      ],
    },
  ];

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        // onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Logo
          level={"title-lg"}
          styles={{ fontWeight: "bolder", fontSize: "1.5rem" }}
        />
        {/* <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRounded />
        </IconButton>
        <Typography level="title-lg">Acme Co.</Typography> */}
        {/* <ColorSchemeToggle sx={{ ml: "auto" }} /> */}
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {navItems.map((item) =>
            !item.childrens ? (
              <NavLink
                to={item.slug}
                style={{ textDecoration: "none" }}
                key={item.name}
              >
                {({ isActive }) => (
                  <ListItem>
                    <ListItemButton selected={isActive}>
                      {item.icon}
                      <ListItemContent>
                        <Typography level="title-sm">{item.name}</Typography>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                )}
              </NavLink>
            ) : (
              <ListItem nested key={item.name}>
                <Toggler
                  defaultExpanded={item.name === "Twitter"}
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      {item.icon}
                      <ListItemContent>
                        <Typography level="title-sm">{item.name}</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    {item.childrens.map((child) => (
                      <NavLink
                        to={child.slug}
                        style={{ textDecoration: "none" }}
                        key={child.name}
                      >
                        {({ isActive }) => (
                          <ListItem sx={{ mt: 0.5 }}>
                            <ListItemButton selected={isActive}>
                              {child.name}
                            </ListItemButton>
                          </ListItem>
                        )}
                      </NavLink>
                    ))}
                  </List>
                </Toggler>
              </ListItem>
            )
          )}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">
            {authUser.fullName.length <= 16
              ? authUser.fullName
              : authUser.fullName.slice(0, 12) + "..."}
          </Typography>
          <Typography level="body-xs">@{authUser.userName}</Typography>
        </Box>
        <IconButton
          onClick={() => logout()}
          size="sm"
          variant="plain"
          color="neutral"
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
