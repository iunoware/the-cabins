-- CreateTable
CREATE TABLE "projectTestimonials" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "designation" TEXT,
    "companyName" TEXT,
    "testimonial" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projectTestimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "projectTestimonials_projectId_idx" ON "projectTestimonials"("projectId");

-- CreateIndex
CREATE INDEX "projectTestimonials_isActive_idx" ON "projectTestimonials"("isActive");

-- AddForeignKey
ALTER TABLE "projectTestimonials" ADD CONSTRAINT "projectTestimonials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
