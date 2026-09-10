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
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [photoUrl, setPhotoUrl] = useState(
    testimonial?.clientPhotoUrl ?? "",
  );

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

    if (uploadingPhoto) {
      toast.error("Please wait until the photo upload is complete.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const ratingValue = formData.get("rating");

      const payload = {
        clientName: formData.get("clientName"),
        clientRole: formData.get("clientRole") || null,
        clientCompany: formData.get("clientCompany") || null,
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
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      {/* Client Information */}
      <section>
        <div>
          <h2 className="text-base font-semibold text-white">
            Client Information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Add information about the client who provided the testimonial.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-300">
              Client Name
            </label>

            <input
              name="clientName"
              required
              defaultValue={testimonial?.clientName ?? ""}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Client Role
            </label>

            <input
              name="clientRole"
              defaultValue={testimonial?.clientRole ?? ""}
              placeholder="Homeowner"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Optional. For example: Homeowner, Director, or Project Manager.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-neutral-300">
              Company
            </label>

            <input
              name="clientCompany"
              defaultValue={testimonial?.clientCompany ?? ""}
              placeholder="Company name"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Optional for individual or residential clients.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Content */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Testimonial Content
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Enter the feedback that will be displayed on the public website.
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm text-neutral-300">
            Testimonial
          </label>

          <textarea
            name="content"
            required
            rows={6}
            defaultValue={testimonial?.content ?? ""}
            placeholder="Write the client's feedback..."
            className={inputClass}
          />
        </div>
      </section>

      {/* Media & Rating */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Media & Rating
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure the client photo and testimonial rating.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-300">
              Client Photo
            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingPhoto || loading}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  handlePhotoUpload(file);
                }

                event.target.value = "";
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              JPG, PNG, or WebP. Maximum file size 5 MB.
            </p>

            {uploadingPhoto && (
              <p className="mt-2 text-xs text-amber-400">
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
                  disabled={loading}
                  className="mt-2 block text-xs font-medium text-red-400 transition hover:text-red-300 disabled:opacity-50"
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

            <select
              name="rating"
              defaultValue={
                testimonial?.rating
                  ? String(testimonial.rating)
                  : ""
              }
              className={inputClass}
            >
              <option value="">No rating</option>
              <option value="1">★ 1 / 5</option>
              <option value="2">★★ 2 / 5</option>
              <option value="3">★★★ 3 / 5</option>
              <option value="4">★★★★ 4 / 5</option>
              <option value="5">★★★★★ 5 / 5</option>
            </select>

            <p className="mt-2 text-xs text-neutral-500">
              Select the rating provided by the client.
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
            Control whether this testimonial appears on the public website.
          </p>
        </div>

        <div className="mt-6">
          <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={testimonial?.isActive ?? true}
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
          disabled={loading || uploadingPhoto}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || uploadingPhoto}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadingPhoto
            ? "Uploading..."
            : loading
              ? "Saving..."
              : isEdit
                ? "Update Testimonial"
                : "Create Testimonial"}
        </button>
      </div>
    </form>
  );
}