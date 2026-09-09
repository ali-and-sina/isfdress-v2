import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress
        size={42}
        thickness={3}
        sx={{
          color: "#e8c4a8",
        }}
      />

      <Box
        component="span"
        sx={{
          color: "#8a817b",
          fontSize: "0.9rem",
        }}
      >
        در حال بارگذاری...
      </Box>
    </Box>
  );
}
