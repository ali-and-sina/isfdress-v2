"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default function WelcomePage({ user }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/admin/dashboard");
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f8fa",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          animation: "welcome 1.2s ease forwards",
          "@keyframes welcome": {
            "0%": {
              opacity: 0,
              transform: "translateY(25px) scale(0.95)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          },
        }}
      >
        {user.name} عزیز خوش‌آمدید
      </Typography>
    </Box>
  );
}
