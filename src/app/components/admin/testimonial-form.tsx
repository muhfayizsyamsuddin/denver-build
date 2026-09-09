"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TestimonialData = {
  id?: string;
  clientName: string;
  clientRole?: string | null;
  clientCompany?: string | null;
  content: string;
  clientPhotoUrl?: string | null;
  rating?: number | null;
  isActive: boolean;
};

type Props = {
  testimonial?: TestimonialData;
};

export function TestimonialForm({ testimonial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    testimonial?.clientPhotoUrl ?? "",
  );
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const isEdit = Boolean(testimonial?.id);

  async function handlePhotoUpload(file: File) {
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

    setUploadingPhoto(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to upload photo.");
        return;
      }

      setPhotoUrl(result.data.url);
      toast.success("Client photo uploaded successfully.");
    } catch {
      toast.error("Failed to upload client photo.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const ratingValue = formData.get("rating");

      const payload = {
        clientName: formData.get("clientName"),
        clientRole: formData.get("clientRole"),
        clientCompany: formData.get("clientCompany"),
        content: formData.get("content"),
        clientPhotoUrl: photoUrl || null,
        rating: ratingValue ? Number(ratingValue) : null,
        isActive: formData.get("isActive") === "on",
      };

      const url = isEdit
        ? `/api/admin/testimonials/${testimonial?.id}`
        : "/api/admin/testimonials";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to save testimonial.");
        return;
      }

      toast.success(
        isEdit
          ? "Testimonial updated successfully."
          : "Testimonial created successfully.",
      );

      router.push("/admin/testimonials");
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
          <label className="text-sm text-neutral-300">Client Name</label>
          <input
            name="clientName"
            required
            defaultValue={testimonial?.clientName ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Client Role</label>
          <input
            name="clientRole"
            defaultValue={testimonial?.clientRole ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Company</label>
        <input
          name="clientCompany"
          defaultValue={testimonial?.clientCompany ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Testimonial</label>
        <textarea
          name="content"
          required
          rows={6}
          defaultValue={testimonial?.content ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">
            Client Photo
          </label>

          <input
            type="file"
            accept="image/*"
            disabled={uploadingPhoto}
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                handlePhotoUpload(file);
              }
            }}
            className="mt-2 block w-full text-sm text-neutral-400"
          />

          {uploadingPhoto && (
            <p className="mt-2 text-xs text-neutral-500">
              Uploading photo...
            </p>
          )}

          {photoUrl && (
            <div className="mt-4">
              <img
                src={photoUrl}
                alt="Client photo preview"
                className="h-24 w-24 rounded-full object-cover"
              />

              <button
                type="button"
                onClick={() => setPhotoUrl("")}
                className="mt-2 block text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            defaultValue={testimonial?.rating ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-neutral-300">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={testimonial?.isActive ?? true}
        />
        Active
      </label>

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
              ? "Update Testimonial"
              : "Create Testimonial"}
        </button>
      </div>
    </form>
  );
}