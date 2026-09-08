"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { DataGrid } from "@mui/x-data-grid";

export default function UsersClient({ users }) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return users;

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        String(user.id).includes(value)
      );
    });
  }, [users, search]);

  const columns = [
    {
      field: "id",
      headerName: "شناسه",
      width: 90,
    },

    {
      field: "user",
      headerName: "کاربر",
      flex: 1.5,
      minWidth: 220,
      sortable: false,
      renderCell: (params) => {
        const user = params.row;

        return (
          <Stack
            direction="row"
            alignitems="center"
            spacing={1.5}
            sx={{ height: "100%" }}
          >
            <Avatar
              src={user.avatar_url || undefined}
              alt={user.name || "کاربر"}
            >
              {user.name?.charAt(0)}
            </Avatar>

            <Box>
              <Typography fontWeight={600}>
                {user.name || "بدون نام"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },

    {
      field: "email",
      headerName: "ایمیل",
      flex: 1.5,
      minWidth: 220,
    },

    {
      field: "google_id",
      headerName: "نوع ورود",
      width: 130,
      renderCell: (params) => (
        <Chip size="small" label={params.value ? "Google" : "ایمیل"} />
      ),
    },

    {
      field: "created_at",
      headerName: "تاریخ عضویت",
      width: 180,
      valueGetter: (value) => {
        if (!value) return "-";

        return new Date(value).toLocaleDateString("fa-IR");
      },
    },

    {
      field: "status",
      headerName: "وضعیت",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const deleted = Boolean(params.row.deleted_at);

        return (
          <Chip
            size="small"
            color={deleted ? "error" : "success"}
            label={deleted ? "حذف شده" : "فعال"}
          />
        );
      },
    },

    {
      field: "actions",
      headerName: "عملیات",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="مشاهده کاربر">
          <IconButton
            onClick={() =>
              router.push(`/admin/dashboard/users/${params.row.id}`)
            }
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          کاربران
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          مدیریت و مشاهده کاربران فروشگاه
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <TextField
          size="small"
          label="جستجوی کاربر"
          placeholder="نام، ایمیل یا شناسه..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: 320, mb: 2 }}
        />

        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
}
