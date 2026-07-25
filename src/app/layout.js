import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "./providers/SessionProvider";

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
      <CartProvider>
        <AuthProvider>
          <body className={vazirmatn.className}>
            <Navbar />
            {children}
          </body>
        </AuthProvider>
      </CartProvider>
    </html>
  );
}
