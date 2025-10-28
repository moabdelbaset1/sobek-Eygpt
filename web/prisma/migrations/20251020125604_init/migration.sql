-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "name_ar" TEXT,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "human_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "generic_name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "dosage_form" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "pack_size" TEXT,
    "registration_number" TEXT,
    "category" TEXT NOT NULL,
    "image_url" TEXT,
    "price" REAL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "veterinary_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "generic_name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "dosage_form" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "withdrawal_period" TEXT,
    "pack_size" TEXT,
    "registration_number" TEXT,
    "category" TEXT NOT NULL,
    "image_url" TEXT,
    "price" REAL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
