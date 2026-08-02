

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,

    description TEXT,
    image_url TEXT,

    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);





CREATE TABLE IF NOT EXISTS products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,

    description TEXT,

    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    original_price DECIMAL(10,2),

    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_on_special_list BOOLEAN NOT NULL DEFAULT FALSE,

    category_id INTEGER NOT NULL REFERENCES categories(id),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);





CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    product_id INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    url TEXT NOT NULL,

    is_thumbnail BOOLEAN NOT NULL DEFAULT FALSE,

    order_index INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT unique_product_image_order
        UNIQUE(product_id, order_index)
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_one_thumbnail_per_product
ON product_images(product_id)
WHERE is_thumbnail = TRUE;




CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    product_id INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    color TEXT,
    size TEXT,

    description TEXT,

    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP,

    CONSTRAINT unique_product_variant
        UNIQUE(product_id, color, size)
);