"use client";
import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";

// این تم عمداً با تم پاستلی فروشگاه (لومیر) فرق داره — پالت آبی-خاکستری
// اداری برای خوانایی بهتر در جداول داده و فرم‌های مدیریتی. اما رنگ هلوی
// برند (#e8c4a8) به‌عنوان accent اصلی نگه داشته شده تا کاملاً بی‌ربط
// به هویت فروشگاه نباشه.
const dashboardTheme = createTheme(
  {
    direction: "rtl",
    palette: {
      mode: "light",
      primary: {
        main: "#4a5568", // آبی-خاکستری تیره، برای هدر و اکشن‌های اصلی
        light: "#718096",
        dark: "#2d3748",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#d4a98a", // نسخه تیره‌تر هلوی برند، به‌عنوان accent
        light: "#e8c4a8",
        dark: "#b3835f",
        contrastText: "#2d3748",
      },
      background: {
        default: "#f4f5f7",
        paper: "#ffffff",
      },
      text: {
        primary: "#2d3748",
        secondary: "#718096",
      },
      success: { main: "#38a169" },
      warning: { main: "#dd8b20" },
      error: { main: "#e53e3e" },
      divider: "#e2e5ea",
    },
    typography: {
      fontFamily: "var(--font-vazirmatn), Vazirmatn, sans-serif",
      h1: { fontWeight: 600, fontSize: "1.75rem" },
      h2: { fontWeight: 600, fontSize: "1.4rem" },
      h6: { fontWeight: 600 },
      button: { fontWeight: 500 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#2d3748",
            color: "#e2e8f0",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
            backgroundColor: "#ffffff",
            borderRadius: 12,
          },
          columnHeaders: {
            backgroundColor: "#f4f5f7",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  },
  faIR
);

export default dashboardTheme;
