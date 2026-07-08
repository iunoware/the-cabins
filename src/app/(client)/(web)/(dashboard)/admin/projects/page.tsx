/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  categoryId: string;
  city: string | null;
  country: string | null;
  status: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  category: Category;
  images: {
    id: string;
    imageUrl: string;
    altText: string | null;
  }[];
  testimonials: {
    id: string;
    clientName: string;
    designation: string | null;
    companyName: string | null;
    testimonial: string;
    rating: number;
  }[];
};

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  categoryId: "",
  city: "",
  country: "UAE",
  status: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
  metaTitle: "",
  metaDescription: "",
  images: "",
  clientName: "",
  designation: "",
  companyName: "",
  testimonial: "",
  rating: 5,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const [projectsRes, categoriesRes] = await Promise.all([
      axios.get("/api/admin/projects"),
      axios.get("/api/admin/project-categories"),
    ]);

    setProjects(projectsRes.data.projects || []);
    setCategories(categoriesRes.data.categories || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(project: Project) {
    const testimonial = project.testimonials[0];

    setEditingId(project.id);

    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      categoryId: project.categoryId,
      city: project.city || "",
      country: project.country || "UAE",
      status: project.status || "",
      isFeatured: project.isFeatured,
      isActive: project.isActive,
      sortOrder: project.sortOrder,
      metaTitle: project.metaTitle || "",
      metaDescription: project.metaDescription || "",
      images: project.images.map((image) => image.imageUrl).join("\n"),
      clientName: testimonial?.clientName || "",
      designation: testimonial?.designation || "",
      companyName: testimonial?.companyName || "",
      testimonial: testimonial?.testimonial || "",
      rating: testimonial?.rating || 5,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.slug || !form.categoryId) {
      toast.error("Title, slug and category are required");
      return;
    }

    setLoading(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      categoryId: form.categoryId,
      city: form.city,
      country: form.country,
      status: form.status,
      isFeatured: form.isFeatured,
      isActive: form.isActive,
      sortOrder: Number(form.sortOrder),
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      images: form.images
        .split("\n")
        .map((imageUrl) => imageUrl.trim())
        .filter(Boolean)
        .map((imageUrl) => ({
          imageUrl,
          altText: form.title,
        })),
      testimonial: {
        clientName: form.clientName,
        designation: form.designation,
        companyName: form.companyName,
        testimonial: form.testimonial,
        rating: Number(form.rating),
      },
    };

    try {
      await axios({
        method: editingId ? "put" : "post",
        url: editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
        data: payload,
      });

      toast.success(editingId ? "Project updated" : "Project created");
      resetForm();
      loadData();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

    try {
      await axios.delete(`/api/admin/projects/${id}`);

      toast.success("Project deleted");
      loadData();
    } catch {
      toast.error("Failed to delete project");
    }
  }

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950">Projects</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage projects, images and project testimonials.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-2xl border border-gray-200 bg-white p-6"
      >
        <h2 className="mb-5 text-lg font-bold text-gray-950">
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <Input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug"
          />

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <Input
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
          />

          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />

          <Input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
          />

          <Input
            name="sortOrder"
            type="number"
            value={form.sortOrder}
            onChange={handleChange}
            placeholder="Sort order"
          />

          <Input
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            placeholder="Meta title"
          />
        </div>

        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description"
        />

        <Textarea
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
          placeholder="Meta description"
        />

        <Textarea
          name="images"
          value={form.images}
          onChange={handleChange}
          placeholder="Add one image URL per line"
        />

        <h3 className="mt-6 mb-4 text-base font-bold text-gray-950">
          Project Testimonial
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Client name"
          />

          <Input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
          />

          <Input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company name"
          />

          <Input
            name="rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
          />
        </div>

        <Textarea
          name="testimonial"
          value={form.testimonial}
          onChange={handleChange}
          placeholder="Client testimonial"
        />
  
        <div className="mt-5 flex gap-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleCheckbox}
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleCheckbox}
            />
            Active
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : editingId ? "Update Project" : "Create Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-5 py-3 text-sm font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4">Project</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">City</th>
              <th className="px-5 py-4">Images</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-100">
                <td className="px-5 py-4 font-semibold">{project.title}</td>
                <td className="px-5 py-4">{project.category.name}</td>
                <td className="px-5 py-4">{project.city || "-"}</td>
                <td className="px-5 py-4">{project.images.length}</td>
                <td className="px-5 py-4">{project.isActive ? "Active" : "Hidden"}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => startEdit(project)}
                    className="mr-4 font-bold text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="font-bold text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-600"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-600"
    />
  );
}
