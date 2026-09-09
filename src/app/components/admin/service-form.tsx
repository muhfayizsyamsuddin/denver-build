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

export function ServiceForm({ service }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(service?.id);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        imageUrl: formData.get("imageUrl"),
        icon: formData.get("icon"),
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
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <div>
        <label className="text-sm text-neutral-300">Service Name</label>
        <input
          name="name"
          required
          defaultValue={service?.name ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Slug</label>
        <input
          name="slug"
          required
          defaultValue={service?.slug ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Description</label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={service?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">Image URL</label>
          <input
            name="imageUrl"
            defaultValue={service?.imageUrl ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Icon</label>
          <input
            name="icon"
            defaultValue={service?.icon ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Display Order</label>
        <input
          type="number"
          min="0"
          name="displayOrder"
          defaultValue={service?.displayOrder ?? 0}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-neutral-300">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={service?.isActive ?? true}
          className="h-4 w-4"
        />
        Active
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-neutral-300 transition hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Service"
              : "Create Service"}
        </button>
      </div>
    </form>
  );
}