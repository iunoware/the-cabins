-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "projectCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
