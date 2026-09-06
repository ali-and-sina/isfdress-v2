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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { DataGrid } from "@mui/x-data-grid";

export default function ProductsClient({ initialProducts, totalItems }) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const products = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return initialProducts;
    }

    return initialProducts.filter((product) => {
      return (
        product.name?.toLowerCase().includes(value) ||
        product.slug?.toLowerCase().includes(value) ||
        String(product.id).includes(value)
      );
    });
  }, [initialProducts, search]);

  const columns = [
    {
      field: "id",
      headerName: "شناسه",
      width: 80,
    },

    {
      field: "product",
      headerName: "محصول",
      flex: 1.5,
      minWidth: 260,
      sortable: false,

      renderCell: (params) => {
        const product = params.row;

        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ height: "100%" }}
          >
            <Avatar
              variant="rounded"
              src={product.thumbnail || undefined}
              alt={product.name}
              sx={{
                width: 48,
                height: 48,
              }}
            >
              {product.name?.charAt(0)}
            </Avatar>

            <Box>
              <Typography fontWeight={600}>{product.name}</Typography>

              <Typography variant="caption" color="text.secondary">
                {product.slug}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },

    {
      field: "price",
      headerName: "قیمت",
      width: 160,

      renderCell: (params) => (
        <Typography fontWeight={600}>
          {Number(params.value).toLocaleString("fa-IR")} تومان
        </Typography>
      ),
    },

    {
      field: "stock",
      headerName: "موجودی",
      width: 120,

      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value > 0 ? "success" : "error"}
          label={
            params.value > 0
              ? `${Number(params.value).toLocaleString("fa-IR")}`
              : "ناموجود"
          }
        />
      ),
    },

    {
      field: "is_on_special_list",
      headerName: "ویژه",
      width: 100,

      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value ? "warning" : "default"}
          label={params.value ? "ویژه" : "عادی"}
        />
      ),
    },

    {
      field: "inStock",
      headerName: "وضعیت موجودی",
      width: 140,

      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value ? "success" : "error"}
          label={params.value ? "موجود" : "ناموجود"}
        />
      ),
    },

    {
      field: "actions",
      headerName: "عملیات",
      width: 110,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Stack direction="row">
          <Tooltip title="ویرایش">
            <IconButton
              onClick={() => router.push(`/admin/products/${params.row.id}`)}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="مشاهده">
            <IconButton
              onClick={() => router.push(`/admin/products/${params.row.id}`)}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          محصولات
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          مدیریت محصولات فروشگاه
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
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <TextField
            size="small"
            label="جستجوی محصول"
            placeholder="نام، اسلاگ یا شناسه..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ width: 320 }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {Number(totalItems).toLocaleString("fa-IR")} محصول
          </Typography>
        </Stack>

        <Box sx={{ height: 620 }}>
          <DataGrid
            rows={products}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 10,
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
}
