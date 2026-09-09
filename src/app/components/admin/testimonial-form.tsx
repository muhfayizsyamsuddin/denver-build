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

  const isEdit = Boolean(testimonial?.id);

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
        clientPhotoUrl: formData.get("clientPhotoUrl"),
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
            Client Photo URL
          </label>
          <input
            name="clientPhotoUrl"
            defaultValue={testimonial?.clientPhotoUrl ?? ""}
            className={inputClass}
          />
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