"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ImageIcon, Save, Star, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Project, ProjectCategory, slugify, useProjects } from "./ProjectsContext";

type ProjectImageState = {
  id?: string;
  file?: File;
  preview: string;
  imageUrl?: string;
  isCover: boolean;
};

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: ProjectCategory;
  editProject?: Project | null;
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  city: "",
  country: "UAE",
  status: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
  metaTitle: "",
  metaDescription: "",
  clientName: "",
  designation: "",
  testimonial: "",
};

export default function ProjectModal({
  isOpen,
  onClose,
  category,
  editProject,
}: ProjectModalProps) {
  const { createProject, updateProject } = useProjects();

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState<ProjectImageState[]>([]);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const replaceIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (editProject) {
      const testimonial = editProject.testimonials[0];

      setForm({
        title: editProject.title,
        slug: editProject.slug,
        description: editProject.description || "",
        city: editProject.city || "",
        country: editProject.country || "UAE",
        status: editProject.status || "",
        isFeatured: editProject.isFeatured,
        isActive: editProject.isActive,
        sortOrder: editProject.sortOrder,
        metaTitle: editProject.metaTitle || "",
        metaDescription: editProject.metaDescription || "",
        clientName: testimonial?.clientName || "",
        designation: testimonial?.designation || "",
        testimonial: testimonial?.testimonial || "",
      });

      setImages(
        editProject.images.map((image, index) => ({
          id: image.id,
          preview: image.imageUrl,
          imageUrl: image.imageUrl,
          isCover: image.isCover || index === 0,
        })),
      );

      setIsSlugEdited(true);
    } else {
      setForm(emptyForm);
      setImages([]);
      setIsSlugEdited(false);
    }
  }, [isOpen, editProject]);

  useEffect(() => {
    if (!isSlugEdited) {
      setForm((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [form.title, isSlugEdited]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newImages: ProjectImageState[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isCover: false,
    }));

    setImages((prev) => {
      const merged = [...prev, ...newImages];

      if (!merged.some((image) => image.isCover) && merged.length > 0) {
        merged[0].isCover = true;
      }

      return merged;
    });

    event.target.value = "";
  }

  function handleReplaceImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const index = replaceIndexRef.current;

    if (!file || index === null) return;

    setImages((prev) =>
      prev.map((image, imageIndex) =>
        imageIndex === index
          ? {
              ...image,
              file,
              preview: URL.createObjectURL(file),
              imageUrl: undefined,
            }
          : image,
      ),
    );

    replaceIndexRef.current = null;
    event.target.value = "";
  }

  function openReplaceFile(index: number) {
    replaceIndexRef.current = index;
    replaceInputRef.current?.click();
  }

  function deleteImage(index: number) {
    setImages((prev) => {
      const filtered = prev.filter((_, imageIndex) => imageIndex !== index);

      if (!filtered.some((image) => image.isCover) && filtered.length > 0) {
        filtered[0].isCover = true;
      }

      return filtered;
    });
  }

  function setCoverImage(index: number) {
    setImages((prev) =>
      prev.map((image, imageIndex) => ({
        ...image,
        isCover: imageIndex === index,
      })),
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    if (!form.slug.trim()) {
      toast.error("Project slug is required");
      return;
    }

    if (!form.city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!images.length) {
      toast.error("Please upload at least one project image");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("categoryId", category.id);
      formData.append("city", form.city);
      formData.append("country", form.country);
      formData.append("status", form.status);
      formData.append("isFeatured", String(form.isFeatured));
      formData.append("isActive", String(form.isActive));
      formData.append("sortOrder", String(form.sortOrder));
      formData.append("metaTitle", form.metaTitle);
      formData.append("metaDescription", form.metaDescription);
      formData.append("clientName", form.clientName);
      formData.append("designation", form.designation);
      formData.append("testimonial", form.testimonial);
      formData.append("rating", "5");

      const existingImages = images
        .filter((image) => image.imageUrl && !image.file)
        .map((image) => image.imageUrl);

      const orderedImages = [...images].sort((a, b) => {
        if (a.isCover) return -1;
        if (b.isCover) return 1;
        return 0;
      });

      formData.set(
        "existingImages",
        JSON.stringify(
          orderedImages
            .filter((image) => image.imageUrl && !image.file)
            .map((image) => image.imageUrl),
        ),
      );

      orderedImages.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      if (editProject) {
        await updateProject(editProject.id, formData);
      } else {
        await createProject(formData);
      }

      onClose();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <h3 className="text-base font-extrabold text-gray-900">
              {editProject ? "Edit Project" : "New Project"}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              Category: <span className="font-bold">{category.name}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h4 className="mb-4 text-sm font-extrabold text-gray-900">
              1. Basic Information
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Project Title *"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Labour Accommodation"
              />

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Slug *
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(event) => {
                    setForm((prev) => ({
                      ...prev,
                      slug: slugify(event.target.value),
                    }));
                    setIsSlugEdited(true);
                  }}
                  placeholder="labour-accommodation"
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25"
                />
              </div>

              <Input
                label="City *"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Dubai"
              />

              <Input
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. UAE"
              />

              <Input
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="e.g. Completed"
              />

              {/* <Input
                label="Sort Order"
                name="sortOrder"
                type="number"
                value={form.sortOrder}
                onChange={handleChange}
                placeholder="0"
              /> */}
            </div>

            <Textarea
              label="Project Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short project description..."
            />
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">
                  2. Project Gallery
                </h4>
                <p className="mt-0.5 text-xs font-medium text-gray-500">
                  Upload multiple images, replace any image, and select cover image.
                </p>
              </div>

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff2d35]"
              >
                <Upload size={14} />
                Upload Images
              </button>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              <input
                ref={replaceInputRef}
                type="file"
                accept="image/*"
                onChange={handleReplaceImage}
                className="hidden"
              />
            </div>

            {images.length === 0 ? (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex min-h-50 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-center transition hover:border-[#e31b23]"
              >
                <ImageIcon size={34} className="mb-3 text-gray-300" />
                <span className="text-sm font-bold text-gray-800">
                  Upload project images
                </span>
                <span className="mt-1 text-xs font-medium text-gray-400">
                  PNG, JPG, WEBP supported
                </span>
              </button>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={`${image.preview}-${index}`}
                    className={`overflow-hidden rounded-2xl border bg-white ${
                      image.isCover ? "border-[#e31b23]" : "border-gray-100"
                    }`}
                  >
                    <div className="relative aspect-video bg-gray-50">
                      <Image
                        src={image.preview}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />

                      {image.isCover && (
                        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#e31b23] px-3 py-1 text-[10px] font-bold text-white">
                          <Star size={11} className="fill-white" />
                          Cover
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3">
                      <button
                        type="button"
                        onClick={() => setCoverImage(index)}
                        className="flex items-center justify-center gap-1 rounded-lg border border-gray-100 px-2 py-2 text-[10px] font-bold text-gray-700 transition hover:border-[#e31b23] hover:text-[#e31b23]"
                      >
                        <Check size={12} />
                        Cover
                      </button>

                      <button
                        type="button"
                        onClick={() => openReplaceFile(index)}
                        className="flex items-center justify-center gap-1 rounded-lg border border-gray-100 px-2 py-2 text-[10px] font-bold text-gray-700 transition hover:border-blue-500 hover:text-blue-600"
                      >
                        <Upload size={12} />
                        Replace
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteImage(index)}
                        className="flex items-center justify-center gap-1 rounded-lg border border-gray-100 px-2 py-2 text-[10px] font-bold text-gray-700 transition hover:border-red-500 hover:text-red-600"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h4 className="mb-4 text-sm font-extrabold text-gray-900">
              3. Client Testimonial
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Client Name"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Client name"
              />

              <Input
                label="Designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Project Manager"
              />
            </div>

            <Textarea
              label="Testimonial"
              name="testimonial"
              value={form.testimonial}
              onChange={handleChange}
              placeholder="Write the client testimonial..."
            />
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h4 className="mb-4 text-sm font-extrabold text-gray-900">4. SEO Details</h4>

            <Input
              label="Meta Title"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="SEO title"
            />

            <Textarea
              label="Meta Description"
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="SEO description"
            />
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5">
            <h4 className="mb-4 text-sm font-extrabold text-gray-900">
              5. Publish Settings
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-bold text-gray-900">Published</p>
                  <p className="mt-0.5 text-[10px] font-medium text-gray-500">
                    Visible on frontend
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleCheckbox}
                  className="h-4 w-4 accent-[#e31b23]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-bold text-gray-900">Featured</p>
                  <p className="mt-0.5 text-[10px] font-medium text-gray-500">
                    Highlight this project
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleCheckbox}
                  className="h-4 w-4 accent-[#e31b23]"
                />
              </label>
            </div>
          </section>

          <div className="sticky bottom-0 z-20 flex justify-end gap-3 border-t border-gray-100 bg-white py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#ff2d35] disabled:opacity-60"
            >
              <Save size={14} />
              {saving ? "Saving..." : editProject ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="mt-4">
      <label className="mb-1.5 block text-xs font-semibold text-gray-700">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25"
      />
    </div>
  );
}
