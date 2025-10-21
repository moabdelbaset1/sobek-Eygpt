-- CreateTable
CREATE TABLE "media_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "title_ar" TEXT,
    "content" TEXT NOT NULL,
    "content_ar" TEXT,
    "type" TEXT NOT NULL,
    "media_type" TEXT,
    "media_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "publish_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
