"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const menuItems = [
  {
    title: "داشبورد",
    icon: <DashboardIcon />,
  },
  {
    title: "محصولات",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "سفارش‌ها",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "کاربران",
    icon: <PeopleIcon />,
  },
  {
    title: "تنظیمات",
    icon: <SettingsIcon />,
  },
];

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          right: 0,
          mt: 14,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          پنل مدیریت
        </Typography>
      </Toolbar>

      <Box sx={{ px: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.title}
              sx={{
                borderRadius: 2,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
