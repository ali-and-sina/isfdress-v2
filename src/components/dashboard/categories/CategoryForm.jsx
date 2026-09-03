"use client";

import { useRef, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

import { useRouter } from "next/navigation";

export default function CategoryForm({ mode = "create", initialData = {} }) {
  const router = useRouter();

  const fileInputRef = useRef(null);

  const [name, setName] = useState(initialData.name || "");

  const [slug, setSlug] = useState(initialData.slug || "");

  const [description, setDescription] = useState(initialData.description || "");

  const [images, setImages] = useState(initialData.images || []);

  const [error, setError] = useState("");

  function handleNameChange(event) {
    const value = event.target.value;

    setName(value);

    if (mode === "create") {
      setSlug(value.trim().toLowerCase().replace(/\s+/g, "-"));
    }
  }

  function handleAddImages(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      isNew: true,
    }));

    setImages((previous) => [...previous, ...newImages]);

    event.target.value = "";
  }

  function handleRemoveImage(imageId) {
    setImages((previous) => previous.filter((image) => image.id !== imageId));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("نام دسته‌بندی الزامی است");

      return;
    }

    if (!slug.trim()) {
      setError("اسلاگ دسته‌بندی الزامی است");

      return;
    }

    const formData = {
      name,
      slug,
      description,
      images,
    };

    console.log(formData);

    router.push("/admin/dashboard/categories");
  }

  const isEdit = mode === "edit";

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        justifyContent="space-between"
        spacing={2}
        sx={{
          mb: 4,
        }}
      >
        <Box>
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => router.back()}
            sx={{
              mb: 1,
            }}
          >
            بازگشت
          </Button>

          <Typography variant="h4" fontWeight={700}>
            {isEdit ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی جدید"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            {isEdit
              ? "اطلاعات دسته‌بندی را ویرایش کنید"
              : "اطلاعات دسته‌بندی جدید را وارد کنید"}
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveAltOutlinedIcon />}
        >
          {isEdit ? "ذخیره تغییرات" : "ایجاد دسته‌بندی"}
        </Button>
      </Stack>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
          }}
        >
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
        {/* Main Form */}

        <Stack spacing={3}>
          {/* Basic Information */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                mb: 3,
              }}
            >
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
                label="توضیحات"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                minRows={4}
                fullWidth
              />
            </Stack>
          </Paper>

          {/* Images */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  تصاویر دسته‌بندی
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  می‌توانید تصویر جدید اضافه یا تصاویر قبلی را حذف کنید
                </Typography>
              </Box>

              <Chip label={`${images.length} تصویر`} size="small" />
            </Stack>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleAddImages}
            />

            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                mb: 3,
              }}
            >
              افزودن تصویر
            </Button>

            {images.length === 0 ? (
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 3,
                  p: 5,
                  textAlign: "center",
                }}
              >
                <AddPhotoAlternateIcon
                  sx={{
                    fontSize: 40,
                    color: "text.secondary",
                    mb: 1,
                  }}
                />

                <Typography color="text.secondary">
                  هنوز تصویری اضافه نشده است
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 2,
                }}
              >
                {images.map((image) => (
                  <Box
                    key={image.id}
                    sx={{
                      position: "relative",
                      aspectRatio: "1",
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box
                      component="img"
                      src={image.preview}
                      alt="تصویر دسته‌بندی"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveImage(image.id)}
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
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Stack>

        {/* Sidebar */}

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
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                mb: 2,
              }}
            >
              پیش‌نمایش
            </Typography>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Typography variant="body2" color="text.secondary">
              نام
            </Typography>

            <Typography
              fontWeight={600}
              sx={{
                mb: 2,
              }}
            >
              {name || "نام دسته‌بندی"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              اسلاگ
            </Typography>

            <Typography
              fontWeight={600}
              sx={{
                wordBreak: "break-all",
              }}
            >
              {slug || "category-slug"}
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
