import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "@/context/CartContext";
import { getNavCategoriesCached } from "@/lib/categories";
import AuthProvider from "./providers/SessionProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

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

export default async function RootLayout({ children }) {
  const categories = await getNavCategoriesCached();

  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CartProvider>
              <AuthProvider>
                <Navbar categories={categories} />
                {children}
              </AuthProvider>
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
