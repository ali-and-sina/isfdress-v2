"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const CATEGORIES = [
  "لباس مجلسی",
  "لباس روزمره",
  "مانتو",
  "پیراهن مردانه",
  "شلوار",
  "کیف و اکسسوری",
  "کفش",
  "کودک",
];

export default function ProductForm({ initialData, productId }) {
  const router = useRouter();
  const isEdit = Boolean(productId);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price || "",
      stock: initialData?.stock ?? "",
      description: initialData?.description || "",
    },
  });

  async function onSubmit(formData) {
    setSubmitting(true);
    try {
      const url = isEdit
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });
      if (!res.ok) throw new Error();
      setToast({ severity: "success", message: "با موفقیت ذخیره شد" });
      setTimeout(() => router.push("/dashboard/products"), 800);
    } catch {
      setToast({ severity: "error", message: "ذخیره‌سازی با خطا مواجه شد" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {isEdit ? "ویرایش محصول" : "افزودن محصول جدید"}
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام محصول"
                {...register("name", { required: "نام محصول الزامی است" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "دسته‌بندی را انتخاب کنید" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="دسته‌بندی"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  >
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="قیمت (تومان)"
                {...register("price", {
                  required: "قیمت الزامی است",
                  min: { value: 1000, message: "قیمت باید حداقل ۱۰۰۰ تومان باشد" },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="موجودی انبار"
                {...register("stock", {
                  required: "موجودی الزامی است",
                  min: { value: 0, message: "موجودی نمی‌تواند منفی باشد" },
                })}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="توضیحات محصول"
                {...register("description")}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={16} /> : null}
            >
              {isEdit ? "ذخیره تغییرات" : "افزودن محصول"}
            </Button>
            <Button variant="outlined" onClick={() => router.back()}>
              انصراف
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
