import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "./providers/SessionProvider";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: "../fonts/Vazirmatn[wght].woff2",
  variable: "--font-vazir",
  weight: "100 900",
  display: "swap",
});

export const metadata = {
  title: "فروشگاه اینترنتی لاکس | خوش‌آمدید ",
  description: "سایت من",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CartProvider>
              <AuthProvider>{children}</AuthProvider>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
