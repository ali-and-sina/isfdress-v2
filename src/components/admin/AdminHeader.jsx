"use client";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const drawerWidth = 240;

export default function AdminHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 1,
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">داشبورد</Typography>

        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
