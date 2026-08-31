"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";

export default function DataToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "جستجو...",
  selectedCount = 0,
  onBulkDelete,
  onExport,
  addLabel,
  addHref,
  onAddClick,
  extraActions,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1.5,
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240, bgcolor: "background.paper" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ flex: 1 }} />

      {selectedCount > 0 && (
        <>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: "rgba(212,169,138,0.15)",
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            {selectedCount} مورد انتخاب شده
          </Box>
          {onBulkDelete && (
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon fontSize="small" />}
              onClick={onBulkDelete}
            >
              حذف گروهی
            </Button>
          )}
        </>
      )}

      {extraActions}

      {onExport && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<DownloadIcon fontSize="small" />}
          onClick={onExport}
        >
          خروجی CSV
        </Button>
      )}

      {(addHref || onAddClick) && (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon fontSize="small" />}
          href={addHref}
          onClick={onAddClick}
        >
          {addLabel}
        </Button>
      )}
    </Box>
  );
}
