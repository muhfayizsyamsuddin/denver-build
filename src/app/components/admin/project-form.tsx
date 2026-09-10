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

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectForm({ project }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(project?.id));

  const [thumbnailUrl, setThumbnailUrl] = useState(
    project?.thumbnailUrl ?? "",
  );

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    project?.images?.map((image) => image.imageUrl) ?? [],
  );

  const [uploadingGallery, setUploadingGallery] = useState(false);

  const isEdit = Boolean(project?.id);

  async function handleThumbnailUpload(file: File) {
    const maxSize = 5 * 1024 * 1024;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Thumbnail must be smaller than 5 MB.");
      return;
    }

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
        toast.error(result.message ?? "Failed to upload thumbnail.");
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
      toast.error(`${oversizedFile.name} is larger than 5 MB.`);
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
          : "Failed to upload gallery images.",
      );
    } finally {
      setUploadingGallery(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (uploadingThumbnail || uploadingGallery) {
      toast.error("Please wait until all image uploads are complete.");
      return;
    }

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
        thumbnailUrl: thumbnailUrl || null,
        galleryImages: galleryUrls,
        isFeatured: formData.get("isFeatured") === "on",
        isPublished: formData.get("isPublished") === "on",
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
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500";

  const isUploading = uploadingThumbnail || uploadingGallery;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      {/* Project Information */}
      <section>
        <div>
          <h2 className="text-base font-semibold text-white">
            Project Information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Define the project title, URL slug, and description.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm text-neutral-300">
                Project Title
              </label>

              <input
                name="title"
                required
                value={title}
                onChange={(event) => {
                  const value = event.target.value;

                  setTitle(value);

                  if (!slugEdited) {
                    setSlug(createSlug(value));
                  }
                }}
                placeholder="Modern Minimalist Residence"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm text-neutral-300">
                Slug
              </label>

              <input
                name="slug"
                required
                value={slug}
                onChange={(event) => {
                  setSlug(event.target.value);
                  setSlugEdited(true);
                }}
                placeholder="modern-minimalist-residence"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-neutral-500">
                Automatically generated from the project title. You can edit it
                manually.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Short Description
            </label>

            <textarea
              name="shortDescription"
              required
              rows={3}
              defaultValue={project?.shortDescription ?? ""}
              placeholder="Write a short summary for project cards and previews."
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Full Description
            </label>

            <textarea
              name="description"
              required
              rows={6}
              defaultValue={project?.description ?? ""}
              placeholder="Describe the project scope, process, and result."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Project Details
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure category, location, and completion year.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <label className="text-sm text-neutral-300">
              Category
            </label>

            <input
              name="category"
              required
              defaultValue={project?.category ?? ""}
              placeholder="Residential Construction"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Location
            </label>

            <input
              name="location"
              required
              defaultValue={project?.location ?? ""}
              placeholder="Makassar, South Sulawesi"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Completion Year
            </label>

            <input
              type="number"
              name="completionYear"
              min="1900"
              max="2100"
              required
              defaultValue={
                project?.completionYear ?? new Date().getFullYear()
              }
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Media & Appearance */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Media & Appearance
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure the thumbnail and project gallery.
          </p>
        </div>

        <div className="mt-6 space-y-8">
          {/* Thumbnail */}
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

                event.target.value = "";
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Main image used for project cards. JPG, PNG, or WebP. Maximum
              file size 5 MB.
            </p>

            {uploadingThumbnail && (
              <p className="mt-2 text-xs text-amber-400">
                Uploading thumbnail...
              </p>
            )}

            {thumbnailUrl && (
              <div className="mt-4 max-w-lg">
                <img
                  src={thumbnailUrl}
                  alt="Project thumbnail preview"
                  className="aspect-video w-full rounded-lg object-cover"
                />

                <button
                  type="button"
                  onClick={() => setThumbnailUrl("")}
                  className="mt-2 text-xs text-red-400 transition hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Gallery */}
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
                }

                event.target.value = "";
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Select multiple images. JPG, PNG, or WebP. Maximum file size
              5 MB each.
            </p>

            {uploadingGallery && (
              <p className="mt-2 text-xs text-amber-400">
                Uploading gallery images...
              </p>
            )}

            {galleryUrls.length > 0 && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {galleryUrls.map((url, index) => (
                  <div key={`${url}-${index}`}>
                    <img
                      src={url}
                      alt={`Project gallery ${index + 1}`}
                      className="aspect-video w-full rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setGalleryUrls((current) =>
                          current.filter(
                            (_, imageIndex) => imageIndex !== index,
                          ),
                        )
                      }
                      className="mt-2 text-xs text-red-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Display Settings */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Display Settings
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Control where and whether this project appears on the public
            website.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={project?.isFeatured ?? false}
              className="h-4 w-4 accent-amber-500"
            />

            Featured
          </label>

          <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={project?.isPublished ?? false}
              className="h-4 w-4 accent-amber-500"
            />

            Published
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading || isUploading}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || isUploading}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading
            ? "Uploading..."
            : loading
              ? "Saving..."
              : isEdit
                ? "Update Project"
                : "Create Project"}
        </button>
      </div>
    </form>
  );
}