"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ServiceData = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  icon?: string | null;
  displayOrder: number;
  isActive: boolean;
};

type Props = {
  service?: ServiceData;
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ServiceForm({ service }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [imageUrl, setImageUrl] = useState(service?.imageUrl ?? "");
  const [name, setName] = useState(service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(service?.id));

  const isEdit = Boolean(service?.id);

  async function handleImageUpload(file: File) {
    const maxSize = 5 * 1024 * 1024;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadingImage(true);

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

      setImageUrl(result.data.url);
      toast.success("Service image uploaded successfully.");
    } catch {
      toast.error("Failed to upload service image.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (uploadingImage) {
      toast.error("Please wait until the image upload is complete.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        imageUrl: imageUrl || null,
        icon: formData.get("icon") || null,
        displayOrder: Number(formData.get("displayOrder")),
        isActive: formData.get("isActive") === "on",
      };

      const url = isEdit
        ? `/api/admin/services/${service?.id}`
        : "/api/admin/services";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to save service.");
        return;
      }

      toast.success(
        isEdit
          ? "Service updated successfully."
          : "Service created successfully.",
      );

      router.push("/admin/services");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      {/* Basic Information */}
      <section>
        <div>
          <h2 className="text-base font-semibold text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Define the service name, URL slug, and description.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm text-neutral-300">
              Service Name
            </label>

            <input
              name="name"
              required
              value={name}
              onChange={(event) => {
                const value = event.target.value;

                setName(value);

                if (!slugEdited) {
                  setSlug(createSlug(value));
                }
              }}
              placeholder="Residential Construction"
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
              placeholder="residential-construction"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Automatically generated from the service name. You can edit it
              manually.
            </p>
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Description
            </label>

            <textarea
              name="description"
              required
              rows={5}
              defaultValue={service?.description ?? ""}
              placeholder="Describe the service and what it includes."
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
            Configure the service image and icon displayed on the website.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-300">
              Service Image
            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingImage}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  handleImageUpload(file);
                }
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              JPG, PNG, or WebP. Maximum file size 5 MB.
            </p>

            {uploadingImage && (
              <p className="mt-3 text-xs text-amber-400">
                Uploading image...
              </p>
            )}

            {imageUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                <img
                  src={imageUrl}
                  alt="Service preview"
                  className="aspect-video w-full object-cover"
                />

                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-xs text-neutral-500">
                    Image uploaded
                  </p>

                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="text-xs font-medium text-red-400 transition hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Icon
            </label>

            <select
              name="icon"
              defaultValue={service?.icon ?? ""}
              className={inputClass}
            >
              <option value="">No icon</option>
              <option value="building">Building</option>
              <option value="hammer">Hammer</option>
              <option value="paintbrush">Paintbrush</option>
            </select>

            <p className="mt-2 text-xs text-neutral-500">
              Select the icon displayed with this service.
            </p>
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
            Control the ordering and visibility of this service.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm text-neutral-300">
              Display Order
            </label>

            <input
              type="number"
              min="0"
              name="displayOrder"
              defaultValue={service?.displayOrder ?? 0}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Lower numbers are displayed first.
            </p>
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={service?.isActive ?? true}
              className="h-4 w-4 accent-amber-500"
            />

            Active
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading || uploadingImage}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadingImage
            ? "Uploading..."
            : loading
              ? "Saving..."
              : isEdit
                ? "Update Service"
                : "Create Service"}
        </button>
      </div>
    </form>
  );
}