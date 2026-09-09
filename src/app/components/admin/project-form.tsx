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
  const [thumbnailUrl, setThumbnailUrl] = useState(
    project?.thumbnailUrl ?? "",
  );
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    project?.images?.map((image) => image.imageUrl) ?? [],
  );

  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(project?.id);

  async function handleThumbnailUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploadingThumbnail(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to upload image.");
        return;
      }

      setThumbnailUrl(result.data.url);
      toast.success("Thumbnail uploaded successfully.");
    } catch {
      toast.error("Failed to upload thumbnail.");
    } finally {
      setUploadingThumbnail(false);
    }
  }

  async function handleGalleryUpload(files: FileList) {
    const selectedFiles = Array.from(files);
    const maxSize = 5 * 1024 * 1024;

    const invalidType = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidType) {
      toast.error(`${invalidType.name} is not a valid image.`);
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > maxSize,
    );

    if (oversizedFile) {
      toast.error(
        `${oversizedFile.name} is larger than 5 MB. No images were uploaded.`,
      );
      return;
    }

    setUploadingGallery(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ?? "Failed to upload gallery image.",
          );
        }

        uploadedUrls.push(result.data.url);
      }

      setGalleryUrls((current) => [
        ...current,
        ...uploadedUrls.filter((url) => !current.includes(url)),
      ]);

      toast.success(
        `${uploadedUrls.length} gallery image${
          uploadedUrls.length > 1 ? "s" : ""
        } uploaded successfully.`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload gallery.",
      );
    } finally {
      setUploadingGallery(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        description: formData.get("description"),
        category: formData.get("category"),
        location: formData.get("location"),
        completionYear: Number(formData.get("completionYear")),
        thumbnailUrl,
        isFeatured: formData.get("isFeatured") === "on",
        isPublished: formData.get("isPublished") === "on",
        galleryImages: galleryUrls,
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
        <label className="text-sm text-neutral-300">
          Thumbnail
        </label>

        <input
          type="file"
          accept="image/*"
          disabled={uploadingThumbnail}
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              handleThumbnailUpload(file);
            }
          }}
          className="mt-2 block w-full text-sm text-neutral-400"
        />

        {uploadingThumbnail && (
          <p className="mt-2 text-xs text-neutral-500">
            Uploading image...
          </p>
        )}

        {thumbnailUrl && (
          <div className="mt-4">
            <img
              src={thumbnailUrl}
              alt="Project thumbnail preview"
              className="aspect-video w-full max-w-md rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label className="text-sm text-neutral-300">
          Project Gallery
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploadingGallery}
          onChange={(event) => {
            if (event.target.files?.length) {
              handleGalleryUpload(event.target.files);
              event.target.value = "";
            }
          }}
          className="mt-2 block w-full text-sm text-neutral-400"
        />

        {uploadingGallery && (
          <p className="mt-2 text-xs text-neutral-500">
            Uploading gallery images...
          </p>
        )}

        {galleryUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryUrls.map((url, index) => (
              <div key={`${url}-${index}`} className="relative">
                <img
                  src={url}
                  alt={`Project gallery ${index + 1}`}
                  className="aspect-video w-full rounded-lg object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setGalleryUrls((current) =>
                      current.filter((_, imageIndex) => imageIndex !== index),
                    )
                  }
                  className="mt-2 text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
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