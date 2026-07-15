-- AlterTable
ALTER TABLE "productCategories" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "productVariants" ADD COLUMN     "ctaText" TEXT,
ADD COLUMN     "discountedPrice" DECIMAL(10,2),
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "originalPrice" DECIMAL(10,2),
ADD COLUMN     "whatsappNumber" TEXT;
