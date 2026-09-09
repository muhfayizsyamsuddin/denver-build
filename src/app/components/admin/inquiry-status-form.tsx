"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
};

export function InquiryStatusForm({ id, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: formData.get("status"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to update inquiry.");
        return;
      }

      toast.success("Inquiry status updated successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <h2 className="font-semibold text-white">
        Inquiry Status
      </h2>

      <p className="mt-2 text-sm leading-6 text-neutral-500">
        Update the progress of this customer inquiry.
      </p>

      <label className="mt-6 block text-sm text-neutral-300">
        Status
      </label>

      <select
        name="status"
        defaultValue={status}
        className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CLOSED">Closed</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </form>
  );
}