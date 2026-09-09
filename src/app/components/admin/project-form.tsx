"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectData = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  location: string;
  completionYear: number;
  thumbnailUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  images?: {
    imageUrl: string;
  }[];
};

type Props = {
  project?: ProjectData;
};

export function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(project?.id);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const galleryImages = String(formData.get("galleryImages") ?? "")
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean);

      const payload = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        description: formData.get("description"),
        category: formData.get("category"),
        location: formData.get("location"),
        completionYear: Number(formData.get("completionYear")),
        thumbnailUrl: formData.get("thumbnailUrl"),
        isFeatured: formData.get("isFeatured") === "on",
        isPublished: formData.get("isPublished") === "on",
        galleryImages,
      };

      const url = isEdit
        ? `/api/admin/projects/${project?.id}`
        : "/api/admin/projects";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to save project.");
        return;
      }

      toast.success(
        isEdit
          ? "Project updated successfully."
          : "Project created successfully.",
      );

      router.push("/admin/projects");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">Project Title</label>
          <input
            name="title"
            required
            defaultValue={project?.title ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Slug</label>
          <input
            name="slug"
            required
            defaultValue={project?.slug ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Short Description</label>
        <textarea
          name="shortDescription"
          required
          rows={3}
          defaultValue={project?.shortDescription ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Full Description</label>
        <textarea
          name="description"
          required
          rows={6}
          defaultValue={project?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-sm text-neutral-300">Category</label>
          <input
            name="category"
            required
            defaultValue={project?.category ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Location</label>
          <input
            name="location"
            required
            defaultValue={project?.location ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Completion Year</label>
          <input
            type="number"
            name="completionYear"
            min="1900"
            required
            defaultValue={
              project?.completionYear ?? new Date().getFullYear()
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Thumbnail URL</label>
        <input
          name="thumbnailUrl"
          defaultValue={project?.thumbnailUrl ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Gallery Image URLs
        </label>

        <p className="mt-1 text-xs text-neutral-500">
          Enter one image URL per line.
        </p>

        <textarea
          name="galleryImages"
          rows={5}
          defaultValue={
            project?.images?.map((image) => image.imageUrl).join("\n") ?? ""
          }
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 text-sm text-neutral-300">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={project?.isFeatured ?? false}
          />
          Featured
        </label>

        <label className="flex items-center gap-3 text-sm text-neutral-300">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={project?.isPublished ?? false}
          />
          Published
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-amber-400 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}