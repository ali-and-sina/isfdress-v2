"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { createProduct, updateProduct } from "@/actions/product.actions";

export default function ProductForm({
  mode = "create",
  initialData = {},
  categories = [],
}) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const isEdit = mode === "edit";

  const [name, setName] = useState(initialData.name || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [description, setDescription] = useState(initialData.description || "");

  const [price, setPrice] = useState(initialData.price ?? "");

  const [originalPrice, setOriginalPrice] = useState(
    initialData.original_price ?? "",
  );

  const [categoryId, setCategoryId] = useState(
    initialData.category_id ? String(initialData.category_id) : "",
  );

  const [isPublished, setIsPublished] = useState(
    Boolean(initialData.is_published),
  );

  const [isSpecial, setIsSpecial] = useState(
    Boolean(initialData.is_on_special_list),
  );

  const [images, setImages] = useState(initialData.images || []);

  const [variants, setVariants] = useState(initialData.variants || []);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(event) {
    const value = event.target.value;

    setName(value);

    if (!isEdit) {
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

  function removeImage(id) {
    setImages((previous) => {
      const image = previous.find((item) => item.id === id);

      if (image?.isNew && image.preview) {
        URL.revokeObjectURL(image.preview);
      }

      return previous.filter((item) => item.id !== id);
    });
  }

  function addVariant() {
    setVariants((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        color: "",
        size: "",
        description: "",
        stock: 0,
        isNew: true,
      },
    ]);
  }

  function updateVariant(id, field, value) {
    setVariants((previous) =>
      previous.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: value,
            }
          : variant,
      ),
    );
  }

  function removeVariant(id) {
    setVariants((previous) => previous.filter((variant) => variant.id !== id));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!name.trim()) {
      setError("نام محصول الزامی است.");
      return;
    }

    if (!slug.trim()) {
      setError("اسلاگ محصول الزامی است.");
      return;
    }

    if (!categoryId) {
      setError("انتخاب دسته‌بندی الزامی است.");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setError("قیمت محصول معتبر نیست.");
      return;
    }

    if (originalPrice !== "" && Number(originalPrice) < 0) {
      setError("قیمت قبل از تخفیف معتبر نیست.");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,

        price: Number(price),

        original_price: originalPrice === "" ? null : Number(originalPrice),

        category_id: Number(categoryId),

        is_published: isPublished,
        is_on_special_list: isSpecial,

        images,
        variants,
      };

      if (isEdit) {
        await updateProduct(initialData.id, data);
      } else {
        await createProduct(data);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setError(error?.message || "خطایی هنگام ذخیره محصول رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Button
            type="button"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => router.back()}
            sx={{ mb: 1 }}
          >
            بازگشت
          </Button>

          <Typography variant="h4" fontWeight={700}>
            {isEdit ? "ویرایش محصول" : "ایجاد محصول جدید"}
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={<SaveOutlinedIcon />}
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : isEdit
              ? "ذخیره تغییرات"
              : "ایجاد محصول"}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Basic information */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            اطلاعات محصول
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="نام محصول"
              value={name}
              onChange={handleNameChange}
              required
              fullWidth
            />

            <TextField
              label="اسلاگ"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              helperText="مثال: basic-cotton-headscarf"
              required
              fullWidth
            />

            <TextField
              select
              label="دسته‌بندی"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              required
              fullWidth
            >
              <MenuItem value="">انتخاب دسته‌بندی</MenuItem>

              {categories.map((category) => (
                <MenuItem key={category.id} value={String(category.id)}>
                  {category.parent_id ? `— ${category.name}` : category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="توضیحات"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              multiline
              minRows={5}
              fullWidth
            />
          </Stack>
        </Paper>

        {/* Pricing */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            قیمت‌گذاری
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <TextField
              label="قیمت"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              fullWidth
              inputProps={{
                min: 0,
              }}
            />

            <TextField
              label="قیمت قبل از تخفیف"
              type="number"
              value={originalPrice}
              onChange={(event) => setOriginalPrice(event.target.value)}
              fullWidth
              inputProps={{
                min: 0,
              }}
            />
          </Stack>
        </Paper>

        {/* Status */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            وضعیت محصول
          </Typography>

          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPublished}
                  onChange={(event) => setIsPublished(event.target.checked)}
                />
              }
              label="محصول منتشر شود"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSpecial}
                  onChange={(event) => setIsSpecial(event.target.checked)}
                />
              }
              label="قرار دادن در لیست محصولات ویژه"
            />
          </Stack>
        </Paper>

        {/* Images */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                تصاویر محصول
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                محصول می‌تواند چند تصویر داشته باشد.
              </Typography>
            </Box>

            <Button
              type="button"
              variant="outlined"
              startIcon={<AddPhotoAlternateOutlinedIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              افزودن تصویر
            </Button>
          </Stack>

          <input
            ref={fileInputRef}
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={handleAddImages}
          />

          {images.length === 0 ? (
            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{ py: 5 }}
            >
              هنوز تصویری اضافه نشده است.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: 2,
              }}
            >
              {images.map((image) => {
                const src = image.preview || image.url;

                return (
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
                      src={src}
                      alt={name || "تصویر محصول"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <IconButton
                      type="button"
                      color="error"
                      onClick={() => removeImage(image.id)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "background.paper",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          )}
        </Paper>

        {/* Variants */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                تنوع‌های محصول
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                رنگ، سایز و موجودی هر تنوع را مشخص کنید.
              </Typography>
            </Box>

            <Button
              type="button"
              variant="outlined"
              startIcon={<AddOutlinedIcon />}
              onClick={addVariant}
            >
              افزودن تنوع
            </Button>
          </Stack>

          <Stack spacing={2}>
            {variants.length === 0 && (
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ py: 4 }}
              >
                هنوز تنوعی برای محصول ثبت نشده است.
              </Typography>
            )}

            {variants.map((variant, index) => (
              <Box
                key={variant.id}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  spacing={2}
                  alignItems={{
                    xs: "stretch",
                    md: "center",
                  }}
                >
                  <TextField
                    label="رنگ"
                    value={variant.color || ""}
                    onChange={(event) =>
                      updateVariant(variant.id, "color", event.target.value)
                    }
                    fullWidth
                  />

                  <TextField
                    label="سایز"
                    value={variant.size || ""}
                    onChange={(event) =>
                      updateVariant(variant.id, "size", event.target.value)
                    }
                    fullWidth
                  />

                  <TextField
                    label="موجودی"
                    type="number"
                    value={variant.stock ?? 0}
                    onChange={(event) =>
                      updateVariant(
                        variant.id,
                        "stock",
                        Number(event.target.value),
                      )
                    }
                    inputProps={{
                      min: 0,
                    }}
                    sx={{
                      minWidth: {
                        md: 150,
                      },
                    }}
                  />

                  <IconButton
                    type="button"
                    color="error"
                    onClick={() => removeVariant(variant.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>

                <TextField
                  label="توضیح تنوع"
                  value={variant.description || ""}
                  onChange={(event) =>
                    updateVariant(variant.id, "description", event.target.value)
                  }
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
