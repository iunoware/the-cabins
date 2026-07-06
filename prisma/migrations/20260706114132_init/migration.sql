-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'CONTACTED', 'RESOLVED', 'SPAM');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "projectCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "badgeLabel" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projectCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "status" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectImages" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projectImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactMessages" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contactMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subheading" TEXT,
    "testimonial" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productFamilies" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productFamilies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productVariants" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'AED',
    "dimensions" TEXT,
    "capacity" TEXT,
    "material" TEXT,
    "warranty" TEXT,
    "brochure" TEXT,
    "model3d" TEXT,
    "thumbnail" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productImages" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productFeatures" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "productFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productSpecifications" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "productSpecifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productApplications" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "productApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productFAQs" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "productFAQs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projectCategories_slug_key" ON "projectCategories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_categoryId_idx" ON "projects"("categoryId");

-- CreateIndex
CREATE INDEX "projectImages_projectId_idx" ON "projectImages"("projectId");

-- CreateIndex
CREATE INDEX "contactMessages_status_idx" ON "contactMessages"("status");

-- CreateIndex
CREATE INDEX "contactMessages_isRead_idx" ON "contactMessages"("isRead");

-- CreateIndex
CREATE INDEX "testimonials_isFeatured_idx" ON "testimonials"("isFeatured");

-- CreateIndex
CREATE INDEX "testimonials_isActive_idx" ON "testimonials"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "productCategories_slug_key" ON "productCategories"("slug");

-- CreateIndex
CREATE INDEX "productCategories_active_idx" ON "productCategories"("active");

-- CreateIndex
CREATE UNIQUE INDEX "productFamilies_slug_key" ON "productFamilies"("slug");

-- CreateIndex
CREATE INDEX "productFamilies_categoryId_idx" ON "productFamilies"("categoryId");

-- CreateIndex
CREATE INDEX "productFamilies_featured_idx" ON "productFamilies"("featured");

-- CreateIndex
CREATE INDEX "productFamilies_popular_idx" ON "productFamilies"("popular");

-- CreateIndex
CREATE INDEX "productFamilies_active_idx" ON "productFamilies"("active");

-- CreateIndex
CREATE UNIQUE INDEX "productVariants_slug_key" ON "productVariants"("slug");

-- CreateIndex
CREATE INDEX "productVariants_familyId_idx" ON "productVariants"("familyId");

-- CreateIndex
CREATE INDEX "productVariants_featured_idx" ON "productVariants"("featured");

-- CreateIndex
CREATE INDEX "productVariants_active_idx" ON "productVariants"("active");

-- CreateIndex
CREATE INDEX "productImages_variantId_idx" ON "productImages"("variantId");

-- CreateIndex
CREATE INDEX "productFeatures_variantId_idx" ON "productFeatures"("variantId");

-- CreateIndex
CREATE INDEX "productSpecifications_variantId_idx" ON "productSpecifications"("variantId");

-- CreateIndex
CREATE INDEX "productApplications_variantId_idx" ON "productApplications"("variantId");

-- CreateIndex
CREATE INDEX "productFAQs_variantId_idx" ON "productFAQs"("variantId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "projectCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectImages" ADD CONSTRAINT "projectImages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productFamilies" ADD CONSTRAINT "productFamilies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "productCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "productFamilies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productFeatures" ADD CONSTRAINT "productFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSpecifications" ADD CONSTRAINT "productSpecifications_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productApplications" ADD CONSTRAINT "productApplications_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productFAQs" ADD CONSTRAINT "productFAQs_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
