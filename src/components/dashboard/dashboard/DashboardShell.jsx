"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import StorefrontIcon from "@mui/icons-material/StorefrontOutlined";
import dashboardTheme from "@/lib/dashboardTheme";
import { ThemeProvider } from "@mui/material/styles";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: "نمای کلی", href: "/admin/dashboard", icon: DashboardIcon },
  { label: "محصولات", href: "/admin/dashboard/products", icon: Inventory2Icon },
  {
    label: "دسته بندی ها",
    href: "/admin/dashboard/categories",
    icon: CategoryOutlinedIcon,
  },
  { label: "سفارشات", href: "/admin/dashboard/orders", icon: ReceiptLongIcon },
  { label: "کاربران", href: "/admin/dashboard/users", icon: PeopleIcon },
];

const DASHBOARD_ROOT = "/admin/dashboard";

function getIsActive(pathname, href) {
  return href === DASHBOARD_ROOT
    ? pathname === DASHBOARD_ROOT
    : pathname?.startsWith(href);
}

function SidebarContent({ pathname, onNavigate }) {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ gap: 1.5, py: 2 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            bgcolor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#2d3748",
            flexShrink: 0,
          }}
        >
          L
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", lineHeight: 1.2 }}
          >
            پنل مدیریت
          </Typography>
          <Typography variant="caption" sx={{ color: "#a0aec0" }}>
            لاکس
          </Typography>
        </Box>
      </Toolbar>

      <List sx={{ px: 1.5, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(pathname, item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={onNavigate}
              selected={isActive}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: isActive ? "#fff" : "#cbd5e0",
                "&.Mui-selected": {
                  bgcolor: "rgba(212, 169, 138, 0.18)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(212, 169, 138, 0.26)" },
                },
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 38 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
      <List sx={{ px: 1.5, py: 1.5 }}>
        <ListItemButton
          component={Link}
          href="/"
          sx={{ borderRadius: 2, color: "#a0aec0" }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 38 }}>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="بازگشت به فروشگاه" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default function DashboardShell({ children, user }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentPage =
    NAV_ITEMS.find((item) => getIsActive(pathname, item.href))?.label ||
    "پنل مدیریت";

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", md: "block" },
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              border: "none",
            },
          }}
          open
        >
          <SidebarContent pathname={pathname} />
        </Drawer>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              border: "none",
            },
          }}
        >
          <SidebarContent
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </Drawer>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Toolbar sx={{ gap: 1 }}>
              <IconButton
                sx={{ display: { xs: "inline-flex", md: "none" } }}
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flex: 1 }}>
                {currentPage}
              </Typography>

              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "primary.main",
                    fontSize: 14,
                  }}
                >
                  {(user?.name || user?.fullName || "A")[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user?.name || user?.fullName || "مدیر"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  خروج از حساب
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
