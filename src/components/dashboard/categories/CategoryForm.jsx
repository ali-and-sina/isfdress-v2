"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

import { createCategory, updateCategory } from "@/actions/category.actions";

export default function CategoryForm({
  mode = "create",
  initialData = {},
  parentCategories = [],
}) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const isEdit = mode === "edit";

  const [name, setName] = useState(initialData.name || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [parentId, setParentId] = useState(
    initialData.parent_id ? String(initialData.parent_id) : "",
  );

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(initialData.image || null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(event) {
    const value = event.target.value;

    setName(value);

    if (!isEdit) {
      setSlug(value.trim().toLowerCase().replace(/\s+/g, "-"));
    }
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("فایل انتخاب‌ شده باید تصویر باشد.");
      return;
    }

    setError("");

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });

    setCurrentImage(null);

    event.target.value = "";
  }

  function handleRemoveImage() {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    setImage(null);
    setCurrentImage(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!name.trim()) {
      setError("نام دسته‌بندی الزامی است.");
      return;
    }

    if (!slug.trim()) {
      setError("اسلاگ دسته‌بندی الزامی است.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (image) {
        setError(
          "برای ذخیره تصویر جدید، ابتدا باید بخش آپلود تصویر به پروژه متصل شود.",
        );
        return;
      }

      const data = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        parent_id: parentId ? Number(parentId) : null,
        image_url: currentImage,
      };

      if (isEdit) {
        await updateCategory(initialData.id, data);
      } else {
        await createCategory(data);
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      setError(error?.message || "خطایی هنگام ذخیره دسته‌بندی رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const previewImage = image?.preview || currentImage;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignitems={{
          xs: "flex-start",
          sm: "center",
        }}
        justifycontent="space-between"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Button
            type="button"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => router.back()}
            sx={{
              mb: 1,
              gap: 1,
            }}
          >
            بازگشت
          </Button>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              marginInlineEnd: 1,
            }}
          >
            {isEdit ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی جدید"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {isEdit
              ? "اطلاعات دسته‌بندی را ویرایش کنید"
              : "اطلاعات دسته‌بندی جدید را وارد کنید"}
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={<SaveAltOutlinedIcon />}
          sx={{
            width: "fit-content",
            height: "fit-content",
            gap: 1,
          }}
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : isEdit
              ? "ذخیره تغییرات"
              : "ایجاد دسته‌بندی"}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
        }}
      >
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              اطلاعات دسته‌بندی
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                label="نام دسته‌بندی"
                value={name}
                onChange={handleNameChange}
                fullWidth
                required
              />

              <TextField
                label="اسلاگ"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                helperText="مثال: women-clothing"
                fullWidth
                required
              />

              <TextField
                select
                label="دسته‌بندی والد"
                value={parentId}
                onChange={(event) => setParentId(event.target.value)}
                fullWidth
              >
                <MenuItem value="">بدون دسته‌بندی والد</MenuItem>

                {parentCategories
                  .filter((category) => category.id !== initialData.id)
                  .map((category) => (
                    <MenuItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                label="توضیحات"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                minRows={4}
                fullWidth
              />
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              تصویر دسته‌بندی
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              هر دسته‌بندی فقط یک تصویر دارد.
            </Typography>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />

            {!previewImage ? (
              <Button
                type="button"
                variant="outlined"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={() => fileInputRef.current?.click()}
              >
                انتخاب تصویر
              </Button>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 320,
                  aspectRatio: "1",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={previewImage}
                  alt={name || "تصویر دسته‌بندی"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <IconButton
                  type="button"
                  color="error"
                  onClick={handleRemoveImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "background.paper",
                    },
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </Paper>
        </Stack>

        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              پیش‌نمایش
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary">
              نام
            </Typography>

            <Typography fontWeight={600} sx={{ mb: 2 }}>
              {name || "نام دسته‌بندی"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              اسلاگ
            </Typography>

            <Typography
              fontWeight={600}
              sx={{
                mb: 2,
                wordBreak: "break-all",
              }}
            >
              {slug || "category-slug"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              والد
            </Typography>

            <Typography fontWeight={600}>
              {parentId
                ? parentCategories.find(
                    (category) => String(category.id) === parentId,
                  )?.name || "نامشخص"
                : "بدون والد"}
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
