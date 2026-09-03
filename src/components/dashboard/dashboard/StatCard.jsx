import { ArrowUpward } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        transition: "0.25s",
        "&": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Stack
        direction="row"
        justifycontent="space-between"
        alignitems="flex-start"
      >
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {title}
          </Typography>

          <Typography variant="h5" fontWeight={700}>
            {value}
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            alignitems="center"
            sx={{ mt: 1.5 }}
          >
            <ArrowUpward fontSize="small" color="success" />

            <Typography variant="caption" color="success.main">
              {subtitle}
            </Typography>
          </Stack>
        </Box>

        <Avatar
          sx={{
            width: 52,
            height: 52,
            bgcolor: "action.hover",
            color: "primary.main",
          }}
        >
          {icon}
        </Avatar>
      </Stack>
    </Paper>
  );
}
