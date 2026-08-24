import { Box, Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, description }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {title}
        </Typography>

        <Typography variant="h5" fontWeight={700} mb={1}>
          {value}
        </Typography>

        <Box>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
